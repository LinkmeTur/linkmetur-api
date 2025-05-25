import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobRepository.create(createJobDto);
    return await this.jobRepository.save(job);
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
