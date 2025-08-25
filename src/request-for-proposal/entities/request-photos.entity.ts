import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RequestForProposal } from './request-for-proposal.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';

@Entity('request_photos')
export class RequestPhotos extends BaseEntity {
  @Column({ nullable: false })
  request_id: string;

  @Column({ nullable: true })
  photo_URL: string;

  @Column({ nullable: true })
  photo_alt: string;

  @ManyToOne(() => RequestForProposal, (request) => request.fotos)
  @JoinColumn({ name: 'request_ID' })
  rfp: RequestForProposal;
}
