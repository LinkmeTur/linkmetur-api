// src/jobs/jobs.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { JobPhotos } from './entities/job_photos.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Corporation } from '../corporations/entities/corporation.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(JobPhotos)
    private readonly photoRepository: Repository<JobPhotos>,
    @InjectRepository(Corporation)
    private readonly corpRepository: Repository<Corporation>,
  ) {}

  async create(createDto: CreateJobDto, corpId: string): Promise<Job> {
    // Verifica se a corporation existe
    const corporation = await this.corpRepository.findOne({
      where: { id: corpId },
    });
    if (!corporation) {
      throw new NotFoundException(
        `Corporation com ID ${corpId} não encontrada.`,
      );
    }

    // Cria as fotos, se fornecidas
    let fotos: JobPhotos[] = [];
    if (createDto.fotos?.length) {
      fotos = createDto.fotos.map((foto) =>
        this.photoRepository.create({
          ...foto,
          job_id: undefined, // será preenchido depois
        }),
      );
      fotos = await this.photoRepository.save(fotos);
    }

    // Cria o job
    const job = this.jobRepository.create({
      ...createDto,
      corp_id: corpId,
      corporation,
      fotos,
    });

    return await this.jobRepository.save(job);
  }

  async findAll(): Promise<Job[]> {
    return await this.jobRepository.find({
      where: { publicado: true },
      relations: ['corporation', 'fotos'],
    });
  }

  async findAllByCorporation(corpId: string): Promise<Job[]> {
    return await this.jobRepository.find({
      where: { corp_id: corpId },
      relations: ['fotos'],
    });
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobRepository.findOne({
      where: { id, publicado: true },
      relations: ['corporation', 'fotos', 'avaliacoes', 'avaliacoes.user'],
    });

    if (!job) {
      throw new NotFoundException(
        `Job com ID ${id} não encontrado ou não publicado.`,
      );
    }

    // Incrementa views
    job.views += 1;
    job.total_views += 1;
    await this.jobRepository.save(job);

    return job;
  }

  async update(
    id: string,
    updateDto: UpdateJobDto,
    corpId: string,
  ): Promise<Job> {
    const job = await this.jobRepository.findOne({
      where: { id, corp_id: corpId },
      relations: ['fotos'],
    });

    if (!job) {
      throw new NotFoundException(
        `Job não encontrado ou você não tem permissão.`,
      );
    }

    // Atualiza fotos se fornecido
    if (updateDto.fotos) {
      // Remove fotos antigas
      await this.photoRepository.delete({ job_id: job.id });
      // Salva novas
      const novasFotos = updateDto.fotos.map((foto) =>
        this.photoRepository.create({ ...foto, job_id: job.id }),
      );
      job.fotos = await this.photoRepository.save(novasFotos);
    }

    Object.assign(job, updateDto);
    return await this.jobRepository.save(job);
  }

  async remove(id: string, corpId: string): Promise<void> {
    const result = await this.jobRepository.delete({ id, corp_id: corpId });
    if (result.affected === 0) {
      throw new NotFoundException(`Job não encontrado ou sem permissão.`);
    }
  }

  async findByCategory(categoria: string): Promise<Job[]> {
    return await this.jobRepository.find({
      where: { categoria, publicado: true },
      relations: ['corporation', 'fotos'],
    });
  }

  async findByLocation(cidade: string, estado: string): Promise<Job[]> {
    return await this.jobRepository
      .createQueryBuilder('job')
      .innerJoin('job.corporation', 'corporation')
      .where('job.publicado = true')
      .andWhere('corporation.cidade ILIKE :cidade', { cidade: `%${cidade}%` })
      .andWhere('corporation.estado = :estado', { estado })
      .getMany();
  }
}
