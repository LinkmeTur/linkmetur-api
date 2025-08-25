// src/request/entities/request.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { RequestForProposal } from 'src/request-for-proposal/entities/request-for-proposal.entity';
import { Proposal } from 'src/proposal/entities/proposal.entity';
import { Job } from 'src/job/entities/job.entity';
import { Corporation } from 'src/corporations/entities/corporation.entity';

@Entity('request')
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

  // Empresa contratante
  @ManyToOne(() => Corporation)
  @JoinColumn({ name: 'corp_id' })
  corporation: Corporation;

  // Prestador (usuário que enviou a proposta)
  @ManyToOne(() => Corporation)
  @JoinColumn({ name: 'user_id' })
  prestador: Corporation;

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
