import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobPhotos } from './entities/job_photos.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(JobPhotos)
    private readonly jobPhotosRepository: Repository<JobPhotos>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    try {
      console.log(createJobDto);
      const job = this.jobRepository.create(createJobDto);
      console.log(job);
      const savedJob = await this.jobRepository.save(job);
      console.log(savedJob);

      if (createJobDto.photos && createJobDto.photos.length > 0) {
        console.log(createJobDto.photos);
        const photos = createJobDto.photos.map((photo) => {
          const jobPhoto = this.jobPhotosRepository.create({
            job_ID: savedJob.id,
            photo_URL: photo.photo_URL,
            photo_alt: photo.photo_alt,
          });
          return this.jobPhotosRepository.save(jobPhoto);
        });

        // Aguarda o salvamento de todas as fotos
        await Promise.all(photos);
      }

      return savedJob;
    } catch (error) {
      throw new HttpException(
        `Erro ao criar job: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Job[]> {
    return await this.jobRepository.find();
  }

  async findOne(id: string): Promise<Job | string> {
    const job = await this.jobRepository.findOne({
      where: { id: id },
    });

    if (!job) {
      throw new HttpException(
        `Job with id ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return job;
  }
  async findForCorporation(id: string): Promise<Job[] | string> {
    const jobs = await this.jobRepository.find({
      where: { corp_Id: id },
    });

    if (!jobs) {
      throw new HttpException(`Jobs  not found!`, HttpStatus.NOT_FOUND);
    }
    return jobs;
  }

  async findFiltered(filters: Partial<CreateJobDto>): Promise<Job[]> {
    const queryBuilder = this.jobRepository.createQueryBuilder('job');

    if (filters.nome_servico) {
      queryBuilder.andWhere('job.nome_servico LIKE :nome_servico', {
        nome_servico: `%${filters.nome_servico}%`,
      });
    }

    if (filters.categoria) {
      queryBuilder.andWhere('job.categoria = :categoria', {
        categoria: filters.categoria,
      });
    }

    if (filters.min_valor) {
      queryBuilder.andWhere('job.min_valor >= :min_valor', {
        min_valor: filters.min_valor,
      });
    }

    if (filters.max_valor) {
      queryBuilder.andWhere('job.max_valor <= :max_valor', {
        max_valor: filters.max_valor,
      });
    }

    if (filters.publicado !== undefined) {
      queryBuilder.andWhere('job.publicado = :publicado', {
        publicado: filters.publicado,
      });
    }

    return await queryBuilder.getMany();
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
