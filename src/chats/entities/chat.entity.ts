// src/chat/entities/chat.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Request } from '../../request/entities/request.entity';
import { RequestForProposal } from '../../request-for-proposal/entities/request-for-proposal.entity';
import { Job } from '../../job/entities/job.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { Corporation } from 'src/corporations/entities/corporation.entity';

@Entity('chat')
export class Chat extends BaseEntity {
  @Column({ type: 'uuid', nullable: false })
  remetente_id: string;

  @Column({ type: 'uuid', nullable: false })
  destinatario_id: string;

  @Column({ type: 'uuid', nullable: true })
  request_id: string;

  @Column({ type: 'uuid', nullable: true })
  rfp_id: string;

  @Column({ type: 'uuid', nullable: true })
  job_id: string;

  @ManyToOne(() => Corporation)
  @JoinColumn({ name: 'remetente_id' })
  remetente: Corporation;

  @ManyToOne(() => Corporation)
  @JoinColumn({ name: 'destinatario_id' })
  destinatario: Corporation;

  @ManyToOne(() => Request, { nullable: true })
  @JoinColumn({ name: 'request_id' })
  request: Request | null;

  @ManyToOne(() => RequestForProposal, { nullable: true })
  @JoinColumn({ name: 'rfp_id' })
  rfp: RequestForProposal | null;

  @ManyToOne(() => Job, { nullable: true })
  @JoinColumn({ name: 'job_id' })
  job: Job | null;

  @Column({ type: 'text', nullable: true })
  conteudo: string;

  @Column({ type: 'text', nullable: true }) // URL da foto
  photo_url: string;

  @Column({ type: 'text', nullable: true })
  photo_alt: string;

  @Column({ type: 'bytea', nullable: true })
  iv: Buffer;

  @Column({ type: 'boolean', default: false })
  lida: boolean;
}
