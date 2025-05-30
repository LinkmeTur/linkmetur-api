import { BaseEntity } from 'src/database/entities/baseEntity';
import { Job } from './job.entity';
export declare class JobPhotos extends BaseEntity {
    job_ID: string;
    photo: Buffer;
    photo_URL: string;
    photo_alt: string;
    job: Job;
}
