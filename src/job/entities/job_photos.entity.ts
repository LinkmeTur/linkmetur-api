import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { Job } from './job.entity';
@Entity()
export class JobPhotos extends BaseEntity {
  @Column({ nullable: false })
  job_ID: string;

  @Column({ type: 'bytea', nullable: true })
  photo: Buffer;

  @Column()
  photo_URL: string;

  @Column()
  photo_alt: string;

  @ManyToOne(() => Job, (job) => job.photos)
  @JoinColumn({ name: 'job_ID' })
  job: Job;
}
