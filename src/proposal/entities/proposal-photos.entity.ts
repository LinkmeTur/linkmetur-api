import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from 'src/database/entities/baseEntity';
import { Proposal } from './proposal.entity';

@Entity()
export class ProposalPhotos extends BaseEntity {
  @Column({ nullable: false })
  proposal_ID: string;

  @Column({ type: 'bytea', nullable: true })
  photo: Buffer;

  @Column({ nullable: true })
  photo_URL: string;

  @Column()
  photo_alt: string;

  @ManyToOne(() => Proposal, (p) => p.fotos)
  @JoinColumn({ name: 'proposal_ID' })
  proposal: Proposal;
}
