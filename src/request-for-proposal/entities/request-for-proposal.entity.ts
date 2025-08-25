// src/request-for-proposal/entities/request-for-proposal.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { Corporation } from '../../corporations/entities/corporation.entity';
import { Job } from '../../job/entities/job.entity';
import { Proposal } from '../../proposal/entities/proposal.entity';
import { Request } from '../../request/entities/request.entity';
import { RequestPhotos } from './request-photos.entity';

@Entity('request_for_proposal')
export class RequestForProposal extends BaseEntity {
  @Column({ type: 'uuid' })
  corp_id: string;

  @Column({ type: 'uuid', nullable: true })
  prestador_id: string;

  @Column({ type: 'uuid', nullable: true })
  job_id: string;

  // Contratante
  @ManyToOne(() => Corporation, (corp) => corp.rfps)
  @JoinColumn({ name: 'corp_id' })
  corporation: Corporation;

  // Prestador (opcional — pode ser aberto)
  @ManyToOne(() => Corporation, { nullable: true })
  @JoinColumn({ name: 'prestador_id' })
  prestador: Corporation;

  // Serviço base (opcional)
  @ManyToOne(() => Job, { nullable: true })
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'text' })
  detalhes: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor_medio: number;

  @Column({ type: 'varchar', length: 50 })
  tipo: string; // 'aberto', 'fechado', 'direcionado'

  @Column({ type: 'timestamptz', nullable: true })
  prazo: Date;

  @Column({ type: 'varchar', length: 20 })
  status: string; // 'aberto', 'encerrado', 'cancelado'

  // Propostas enviadas por prestadores
  @OneToMany(() => Proposal, (proposal) => proposal.rfp, { cascade: true })
  proposals: Proposal[];

  // Pedido gerado ao aceitar uma proposta
  @OneToOne(() => Request, (request) => request.rfp, {
    cascade: true,
    nullable: true,
  })
  request: Request;

  // Fotos do projeto
  @OneToMany(() => RequestPhotos, (photo) => photo.rfp, { cascade: true })
  fotos: RequestPhotos[];
}
