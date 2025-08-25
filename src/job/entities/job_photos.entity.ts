import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { Job } from './job.entity';
@Entity('job_photos')
export class JobPhotos extends BaseEntity {
  @Column({ type: 'uuid' })
  job_id: string;

  @ManyToOne(() => Job, (job) => job.fotos)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @Column({ type: 'text' })
  photo_url: string;

  @Column({ type: 'varchar', length: 255 })
  photo_alt: string;
}
