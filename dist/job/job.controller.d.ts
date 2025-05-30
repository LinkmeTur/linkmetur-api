import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobService);
    create(createJobDto: CreateJobDto): Promise<import("./entities/job.entity").Job>;
    findAll(): Promise<import("./entities/job.entity").Job[]>;
    findOne(id: string): Promise<string | import("./entities/job.entity").Job>;
    update(id: string, updateJobDto: UpdateJobDto): Promise<import("./entities/job.entity").Job>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
