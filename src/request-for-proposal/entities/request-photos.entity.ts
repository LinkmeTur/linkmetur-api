import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RequestForProposal } from './request-for-proposal.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';

@Entity()
export class RequestPhotos extends BaseEntity {
  @Column({ nullable: false })
  request_ID: string;

  @Column({ nullable: true })
  photo_URL: string;

  @Column({ nullable: true })
  photo_alt: string;

  @ManyToOne(() => RequestForProposal, (request) => request.fotos)
  @JoinColumn({ name: 'request_ID' })
  request: RequestForProposal;
}
