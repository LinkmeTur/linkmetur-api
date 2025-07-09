import { BaseEntity } from 'src/database/entities/baseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Job } from './job.entity';

@Entity()
export class JobEvaluation extends BaseEntity {
  @Column({ nullable: false })
  job_id: string;
  @Column({ nullable: false })
  user_id: string;
  @Column({ nullable: false })
  rating: number;
  @Column({ nullable: false })
  comment: string;
  @ManyToOne(() => Job, (job) => job.evaluations)
  job: Job;
}
