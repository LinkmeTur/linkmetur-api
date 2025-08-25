// src/proposal/proposal.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proposal } from './entities/proposal.entity';
import { ProposalPhotos } from './entities/proposal-photos.entity';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { RequestForProposal } from '../request-for-proposal/entities/request-for-proposal.entity';
import { Corporation } from '../corporations/entities/corporation.entity';

@Injectable()
export class ProposalService {
  constructor(
    @InjectRepository(Proposal)
    private readonly proposalRepo: Repository<Proposal>,
    @InjectRepository(ProposalPhotos)
    private readonly photoRepo: Repository<ProposalPhotos>,
    @InjectRepository(RequestForProposal)
    private readonly rfpRepo: Repository<RequestForProposal>,
    @InjectRepository(Corporation)
    private readonly corpRepo: Repository<Corporation>,
  ) {}

  async create(
    createDto: CreateProposalDto,
    corpId: string,
    userId: string,
  ): Promise<Proposal> {
    const rfp = await this.rfpRepo.findOne({ where: { id: createDto.rfp_id } });
    if (!rfp) {
      throw new NotFoundException(`RFP #${createDto.rfp_id} não encontrado.`);
    }

    if (rfp.status !== 'aberto') {
      throw new ForbiddenException('Este RFP não aceita mais propostas.');
    }

    const corporation = await this.corpRepo.findOne({ where: { id: corpId } });
    if (!corporation) {
      throw new NotFoundException(`Corporation #${corpId} não encontrada.`);
    }

    // Cria as fotos
    const fotos =
      createDto.fotos?.map((foto) =>
        this.photoRepo.create({ ...foto, proposal: undefined }),
      ) || [];

    const proposal = this.proposalRepo.create({
      ...createDto,
      corp_id: corpId,
      user_id: userId,
      rfp,
      corporation,
      fotos,
      status: 'enviada',
      selecionado: false,
    });

    return await this.proposalRepo.save(proposal);
  }

  async findAllByRfp(rfpId: string): Promise<Proposal[]> {
    return await this.proposalRepo.find({
      where: { rfp_id: rfpId },
      relations: ['corporation', 'fotos'],
    });
  }

  async findAllByCorporation(corpId: string): Promise<Proposal[]> {
    return await this.proposalRepo.find({
      where: { corp_id: corpId },
      relations: ['rfp', 'rfp.corporation', 'fotos'],
    });
  }

  async findOne(id: string): Promise<Proposal> {
    const proposal = await this.proposalRepo.findOne({
      where: { id },
      relations: ['rfp', 'corporation', 'fotos'],
    });

    if (!proposal) {
      throw new NotFoundException(`Proposal #${id} não encontrada.`);
    }

    return proposal;
  }

  async update(
    id: string,
    updateDto: UpdateProposalDto,
    corpId: string,
  ): Promise<Proposal> {
    const proposal = await this.findOne(id);

    if (proposal.corp_id !== corpId) {
      throw new ForbiddenException(
        'Você não tem permissão para editar esta proposta.',
      );
    }

    if (proposal.status !== 'enviada') {
      throw new ForbiddenException(
        'Apenas propostas "enviadas" podem ser editadas.',
      );
    }

    // Atualiza fotos
    if (updateDto.fotos) {
      await this.photoRepo.delete({ proposal_id: id });
      proposal.fotos = updateDto.fotos.map((foto) =>
        this.photoRepo.create({ ...foto, proposal, proposal_id: id }),
      );
    }

    Object.assign(proposal, updateDto);
    return await this.proposalRepo.save(proposal);
  }

  async markAsSelected(id: string, rfpCorpId: string): Promise<void> {
    const proposal = await this.proposalRepo.findOne({
      where: { id },
      relations: ['rfp', 'rfp.corporation'],
    });

    if (!proposal) {
      throw new NotFoundException(`Proposal não encontrada`);
    }

    if (proposal.rfp.corp_id !== rfpCorpId) {
      throw new ForbiddenException(
        'Apenas o dono do RFP pode selecionar a proposta.',
      );
    }

    if (proposal.rfp.status !== 'aberto') {
      throw new ForbiddenException('O RFP já foi encerrado.');
    }

    // Marca como selecionada
    proposal.selecionado = true;
    proposal.status = 'aceita';

    // Marca outras como rejeitadas
    await this.proposalRepo.update(
      { rfp_id: proposal.rfp_id, id: id },
      { selecionado: false, status: 'rejeitada' },
    );

    await this.proposalRepo.save(proposal);
  }
}
