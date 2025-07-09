/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobPhotos } from './entities/job_photos.entity';
import { JobEvaluation } from './entities/job_evaluation.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(JobPhotos)
    private readonly jobPhotosRepository: Repository<JobPhotos>,
    @InjectRepository(JobEvaluation)
    private readonly jobEvaluationRepository: Repository<JobEvaluation>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    try {
      const { photos, ...newDTO } = createJobDto;

      const job = this.jobRepository.create(newDTO);
      const savedJob = await this.jobRepository.save(job);

      if (photos) {
        for (const photo of photos) {
          const jobPhoto = this.jobPhotosRepository.create({
            job_ID: savedJob.id,
            photo_URL: photo.photo_URL,
            photo_alt: photo.photo_alt,
          });

          await this.jobPhotosRepository.save(jobPhoto);
        }

        // Aguarda o salvamento de todas as fotos
      }

      return savedJob;
    } catch (error) {
      throw new HttpException(
        `Erro ao criar job: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(data: {
    page?: number;
    limit?: number;
  }): Promise<
    { jobs: Job[]; totalRecords: number; totalPages: number } | Job[]
  > {
    const { page, limit } = data;
    if (page && limit) {
      const skip = (page - 1) * limit;
      const [jobs, counter] = await this.jobRepository.findAndCount({
        skip,
        take: limit,
        relations: {
          photos: true,
          evaluations: true,
          corp: true,
        },
      });
      const totalPages = Math.ceil(Number(counter) / Number(limit));
      return { jobs, totalRecords: counter, totalPages };
    }
    return await this.jobRepository.find({
      relations: {
        photos: true,
        evaluations: true,
        corp: {
          users: true,
        },
      },
    });
  }

  async findOne(id: string): Promise<Job | string> {
    const job = await this.jobRepository.findOne({
      where: { id: id },
      relations: {
        photos: true,
        evaluations: true,
      },
    });

    if (!job) {
      throw new HttpException(
        `Job with id ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return job;
  }
  async findForCorporation(
    id: string,
    page?: number,
    limit?: number,
  ): Promise<
    { jobs: Job[]; totalRecords: number; totalPages: number } | Job[] | string
  > {
    if (page && limit) {
      const skip = (page - 1) * limit;
      const [jobs, total] = await this.jobRepository.findAndCount({
        where: { corpId: id },
        skip,
        take: limit,
        relations: {
          photos: true,
          evaluations: true,
        },
      });
      console.log(jobs);
      console.log(total);
      if (!jobs) {
        throw new HttpException(`Jobs  not found!`, HttpStatus.NOT_FOUND);
      }
      const totalPages = Math.ceil(Number(total) / Number(limit));

      return { jobs, totalRecords: total, totalPages };
    }
    const jobs = await this.jobRepository.find({
      where: { corpId: id },
      relations: {
        photos: true,
        evaluations: true,
      },
    });

    if (!jobs) {
      throw new HttpException(`Jobs  not found!`, HttpStatus.NOT_FOUND);
    }
    return jobs;
  }

  async findFiltered(filters: {
    nome_servico?: string;
    categoria?: string;
    localizacao?: string;
    min_valor?: number;
    max_valor?: number;
    min_rating?: number;
    orderBy?: 'relevance' | 'rating' | 'price-asc' | 'price-desc';
    page: number;
    limit: number;
  }): Promise<{ jobs: Job[]; totalRecords: number; totalPages: number }> {
    const where: any = {};
    const order: any = {};
    const { page, limit } = filters;

    // Filtros iniciais
    if (filters.nome_servico) {
      where.nome_servico = ILike(`%${filters.nome_servico}%`);
    }
    if (filters.categoria) {
      where.categoria = filters.categoria;
    }
    if (filters.min_valor) {
      where.min_valor = MoreThanOrEqual(filters.min_valor);
    }
    if (filters.max_valor) {
      where.max_valor = LessThanOrEqual(filters.max_valor);
    }

    // Busca todos os registros que atendem aos filtros principais
    const allJobs = await this.jobRepository.find({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      order,
      relations: { photos: true, evaluations: true, corp: true },
    });

    // Filtro por localização
    let filteredJobs = allJobs;
    if (filters.localizacao) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.corp.cidade.includes(filters.localizacao as string) ||
          job.corp.estado.includes(filters.localizacao as string),
      );
    }

    // Filtro por média de rating
    if (filters.min_rating) {
      filteredJobs = filteredJobs.filter((job) => {
        const avgRating =
          job.evaluations.reduce((sum, ev) => sum + ev.rating, 0) /
            job.evaluations.length || 0;
        return avgRating >= (filters.min_rating as number);
      });
    }

    // Atualiza totalRecords e totalPages com base nos registros filtrados
    const totalRecords = filteredJobs.length;
    const totalPages = Math.ceil(totalRecords / limit);

    // Aplica paginação manual com `slice()`
    const skip = (page - 1) * limit;
    const paginatedJobs = filteredJobs.slice(skip, skip + limit);

    return { jobs: paginatedJobs, totalRecords, totalPages };
  }
  async findFilteredForCorp(
    corpId: string,
    filters: {
      nome_servico?: string;
      categoria?: string;
      localizacao?: string;
      min_valor?: number;
      max_valor?: number;
      min_rating?: number;
      orderBy?: 'relevance' | 'rating' | 'price-asc' | 'price-desc';
      page: number;
      limit: number;
    },
  ): Promise<{ jobs: Job[]; totalRecords: number; totalPages: number }> {
    const where: any = { corpId };
    const order: any = {};
    const { page, limit } = filters;

    // Filtros iniciais
    if (filters.nome_servico) {
      where.nome_servico = ILike(`%${filters.nome_servico}%`);
    }
    if (filters.categoria) {
      where.categoria = filters.categoria;
    }
    if (filters.min_valor) {
      where.min_valor = MoreThanOrEqual(filters.min_valor);
    }
    if (filters.max_valor) {
      where.max_valor = LessThanOrEqual(filters.max_valor);
    }

    // Busca todos os registros que atendem aos filtros principais
    const allJobs = await this.jobRepository.find({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      order,
      relations: { photos: true, evaluations: true, corp: true },
    });

    // Filtro por localização
    let filteredJobs = allJobs;
    if (filters.localizacao) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.corp.cidade.includes(filters.localizacao as string) ||
          job.corp.estado.includes(filters.localizacao as string),
      );
    }

    // Filtro por média de rating
    if (filters.min_rating) {
      filteredJobs = filteredJobs.filter((job) => {
        const avgRating =
          job.evaluations.reduce((sum, ev) => sum + ev.rating, 0) /
            job.evaluations.length || 0;
        return avgRating >= (filters.min_rating as number);
      });
    }

    // Atualiza totalRecords e totalPages com base nos registros filtrados
    const totalRecords = filteredJobs.length;
    const totalPages = Math.ceil(totalRecords / limit);

    // Aplica paginação manual com `slice()`
    const skip = (page - 1) * limit;
    const paginatedJobs = filteredJobs.slice(skip, skip + limit);

    return { jobs: paginatedJobs, totalRecords, totalPages };
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const job = (await this.findOne(id)) as Job;
    const updatedJob = Object.assign(job, updateJobDto);
    return await this.jobRepository.save(updatedJob);
  }

  async remove(id: string) {
    const job = await this.findOne(id);
    if (!job) {
      throw new HttpException(
        `Job with id ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.jobRepository.delete(id);
  }
}
