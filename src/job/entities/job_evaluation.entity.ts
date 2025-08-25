import { BaseEntity } from 'src/database/entities/baseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Job } from './job.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('job_evaluation')
export class JobEvaluation extends BaseEntity {
  @Column({ type: 'uuid' })
  job_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => Job, (job) => job.avaliacoes)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'smallint' })
  rating: number; // 1 a 5

  @Column({ type: 'text' })
  comment: string;
}
