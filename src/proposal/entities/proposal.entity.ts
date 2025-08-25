import { BaseEntity } from 'src/database/entities/baseEntity';
import { RequestForProposal } from 'src/request-for-proposal/entities/request-for-proposal.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ProposalPhotos } from './proposal-photos.entity';

import { Corporation } from 'src/corporations/entities/corporation.entity';
@Entity()
export class Proposal extends BaseEntity {
  @Column({ type: 'uuid' })
  rfp_id: string;

  @Column({ type: 'uuid' })
  corp_id: string;

  @Column({ type: 'uuid', nullable: true })
  user_id: string;

  @ManyToOne(() => RequestForProposal, (rfp) => rfp.proposals)
  @JoinColumn({ name: 'rfp_id' })
  rfp: RequestForProposal;

  @ManyToOne(() => Corporation)
  @JoinColumn({ name: 'corp_id' })
  corporation: Corporation;

  @ManyToOne(() => Corporation, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: Corporation;

  @Column({ type: 'text', nullable: true })
  resumo_proposta: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor_proposta: number;

  @Column({ type: 'text', nullable: true })
  observacoes: string;

  @Column({ type: 'timestamptz', nullable: true })
  prazo: Date;

  @Column({ type: 'varchar', length: 20 })
  status: string; // 'enviada', 'aceita', 'rejeitada'

  @Column({ type: 'boolean', default: false })
  selecionado: boolean;

  @OneToMany(() => ProposalPhotos, (photos) => photos.proposal)
  fotos: ProposalPhotos[];
}
