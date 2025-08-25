import { BaseEntity } from 'src/database/entities/baseEntity';
import { Proposal } from 'src/proposal/entities/proposal.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { RequestPhotos } from './request-photos.entity';
import { Request } from 'src/request/entities/request.entity';
import { Corporation } from '../../corporations/entities/corporation.entity';
import { Job } from 'src/job/entities/job.entity';

@Entity('request_for_proposal')
export class RequestForProposal extends BaseEntity {
  @Column({ type: 'uuid' })
  corp_id: string;

  @Column({ type: 'uuid', nullable: true })
  prestador_id: string;

  @Column({ type: 'uuid', nullable: true })
  job_id: string;

  @ManyToOne(() => Corporation, (corp) => corp.rfps)
  @JoinColumn({ name: 'corp_id' })
  corporation: Corporation;

  @ManyToOne(() => Corporation, { nullable: true })
  @JoinColumn({ name: 'prestador_id' })
  prestador: Corporation;

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
  tipo: string;

  @Column({ type: 'timestamptz', nullable: true })
  prazo: Date;

  @Column({ type: 'varchar', length: 20 })
  status: string; // 'aberto', 'encerrado', etc

  @OneToMany(() => Proposal, (proposal) => proposal.rfp)
  proposals: Proposal[];

  @OneToOne(() => Request, (request) => request.rfp)
  request: Request;

  @OneToMany(() => RequestPhotos, (photo) => photo.rfp)
  @JoinColumn({ name: 'rfp_id' })
  fotos: RequestPhotos[];
}
