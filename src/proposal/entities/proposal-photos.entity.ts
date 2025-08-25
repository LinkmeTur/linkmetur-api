import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from 'src/database/entities/baseEntity';
import { Proposal } from './proposal.entity';

@Entity()
export class ProposalPhotos extends BaseEntity {
  @Column({ type: 'uuid' })
  proposal_id: string;

  @ManyToOne(() => Proposal, (proposal) => proposal.fotos)
  @JoinColumn({ name: 'proposal_id' })
  proposal: Proposal;

  @Column({ type: 'text' })
  photo_url: string;

  @Column({ type: 'varchar', length: 255 })
  photo_alt: string;
}
