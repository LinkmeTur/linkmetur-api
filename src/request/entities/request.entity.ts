import { Corporation } from 'src/corporations/entities/corporation.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { Job } from 'src/job/entities/job.entity';
import { Proposal } from 'src/proposal/entities/proposal.entity';
import { RequestForProposal } from 'src/request-for-proposal/entities/request-for-proposal.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Request extends BaseEntity {
  @Column({ type: 'uuid' })
  rfp_id: string;

  @Column({ type: 'uuid' })
  proposal_id: string;

  @Column({ type: 'uuid' })
  job_id: string;

  @Column({ type: 'uuid' })
  corp_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => RequestForProposal, (rfp) => rfp.request)
  @JoinColumn({ name: 'rfp_id' })
  rfp: RequestForProposal;

  @ManyToOne(() => Proposal)
  @JoinColumn({ name: 'proposal_id' })
  proposal: Proposal;

  @ManyToOne(() => Job)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @ManyToOne(() => Corporation)
  @JoinColumn({ name: 'corp_id' })
  corporation: Corporation;

  @ManyToOne(() => Corporation)
  @JoinColumn({ name: 'user_id' })
  user: Corporation;

  @Column({ type: 'varchar', length: 255 })
  nome_job: string;

  @Column({ type: 'varchar', length: 255 })
  nome_corp: string;

  @Column({ type: 'varchar', length: 255 })
  nome_prestador: string;

  @Column({ type: 'timestamptz' })
  prazo: Date;

  @Column({ type: 'varchar', length: 20 })
  status: string; // 'ativo', 'concluído', 'cancelado'
}
