import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
export declare class JobService {
    private readonly jobRepository;
    constructor(jobRepository: Repository<Job>);
    create(createJobDto: CreateJobDto): Promise<Job>;
    findAll(): Promise<Job[]>;
    findOne(id: string): Promise<Job | string>;
    update(id: string, updateJobDto: UpdateJobDto): Promise<Job>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
