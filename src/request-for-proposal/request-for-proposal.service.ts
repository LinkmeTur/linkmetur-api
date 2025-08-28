// src/request-for-proposal/request-for-proposal.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestForProposal } from './entities/request-for-proposal.entity';
import { RequestPhotos } from './entities/request-photos.entity';
import { Corporation } from 'src/corporations/entities/corporation.entity';
import { Job } from 'src/job/entities/job.entity';
import { CreateRfpDto } from './dto/create-request-for-proposal.dto';
import { UpdateRequestForProposalDto } from './dto/update-request-for-proposal.dto';
import { NotificationsService } from 'src/notification/notification.service';

@Injectable()
export class RequestForProposalService {
  constructor(
    @InjectRepository(RequestForProposal)
    private readonly rfpRepo: Repository<RequestForProposal>,
    @InjectRepository(RequestPhotos)
    private readonly photoRepo: Repository<RequestPhotos>,
    @InjectRepository(Corporation)
    private readonly corpRepo: Repository<Corporation>,
    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(
    createDto: CreateRfpDto,
    corpId: string,
  ): Promise<RequestForProposal> {
    const corporation = await this.corpRepo.findOne({ where: { id: corpId } });
    if (!corporation) {
      throw new NotFoundException(
        `Corporation com ID ${corpId} não encontrada.`,
      );
    }

    let job: Job | null = null;
    if (createDto.job_id) {
      job = await this.jobRepo.findOne({ where: { id: createDto.job_id } });
    }
    if (!job)
      throw new NotFoundException(`Job #${createDto.job_id} não encontrado`);

    let prestador: Corporation | null = null;
    if (createDto.prestador_id) {
      prestador = await this.corpRepo.findOne({
        where: { id: createDto.prestador_id },
      });
    }

    // Cria as fotos
    const fotos =
      createDto.fotos?.map((foto) =>
        this.photoRepo.create({ ...foto, request_id: undefined }),
      ) || [];

    const newRfp = {
      ...createDto,
      corp_id: corporation.id,
      corporation,
      job,
      prestador: prestador ?? undefined,
      fotos,
      status: 'aberto',
    };

    const rfp = this.rfpRepo.create(newRfp);
    await this.notificationsService.createForCorporation(
      createDto.prestador_id ?? '',
      'Novo Serviço Disponível',
      `Um novo serviço "${createDto.titulo}" foi publicado.`,
      'novo_servico',
      `/rfps/${rfp.id}`,
      { job_id: createDto.job_id },
    );

    return await this.rfpRepo.save(rfp);
  }

  async findAll(): Promise<RequestForProposal[]> {
    return await this.rfpRepo.find({
      where: { status: 'aberto' },
      relations: ['corporation', 'prestador', 'job', 'fotos'],
    });
  }

  async findAllByCorporation(corpId: string): Promise<RequestForProposal[]> {
    return await this.rfpRepo.find({
      where: [{ corp_id: corpId }, { prestador_id: corpId }],
      relations: ['corporation', 'prestador', 'job', 'fotos', 'proposals'],
    });
  }

  async findOne(id: string): Promise<RequestForProposal> {
    const rfp = await this.rfpRepo.findOne({
      where: { id },
      relations: [
        'corporation',
        'prestador',
        'job',
        'fotos',
        'proposals',
        'request',
      ],
    });

    if (!rfp) {
      throw new NotFoundException(`RFP com ID ${id} não encontrado.`);
    }

    return rfp;
  }

  async update(
    id: string,
    updateDto: UpdateRequestForProposalDto,
    corpId: string,
  ): Promise<RequestForProposal> {
    const rfp = await this.findOne(id);

    if (rfp.corp_id !== corpId) {
      throw new ForbiddenException(
        'Você não tem permissão para editar este RFP.',
      );
    }

    if (rfp.status !== 'aberto') {
      throw new ForbiddenException('Apenas RFPs abertos podem ser editados.');
    }

    if (updateDto.job_id) {
      const job = await this.jobRepo.findOne({
        where: { id: updateDto.job_id },
      });
      if (!job) throw new NotFoundException(`Job não encontrado`);
      rfp.job = job;
      rfp.job_id = job.id;
    }

    if (updateDto.prestador_id) {
      const prestador = await this.corpRepo.findOne({
        where: { id: updateDto.prestador_id },
      });
      if (!prestador) throw new NotFoundException(`Prestador não encontrado`);
      rfp.prestador = prestador;
      rfp.prestador_id = prestador.id;
    }

    // Atualiza fotos
    if (updateDto.fotos) {
      await this.photoRepo.delete({ request_id: id });
      rfp.fotos = updateDto.fotos.map((foto) =>
        this.photoRepo.create({ ...foto, rfp, request_id: id }),
      );
    }

    Object.assign(rfp, updateDto);
    return await this.rfpRepo.save(rfp);
  }

  async close(id: string, corpId: string): Promise<void> {
    const rfp = await this.findOne(id);
    if (rfp.corp_id !== corpId) {
      throw new ForbiddenException('Acesso negado');
    }
    rfp.status = 'encerrado';
    await this.rfpRepo.save(rfp);
  }

  async remove(id: string, corpId: string): Promise<void> {
    const rfp = await this.findOne(id);
    if (rfp.corp_id !== corpId) {
      throw new ForbiddenException('Acesso negado');
    }
    if (rfp.status !== 'aberto') {
      throw new ForbiddenException('Apenas RFPs abertos podem ser removidos');
    }
    await this.rfpRepo.remove(rfp);
  }
}
