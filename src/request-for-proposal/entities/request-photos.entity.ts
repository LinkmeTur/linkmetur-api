import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RequestForProposal } from './request-for-proposal.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';

@Entity()
export class RequestPhotos extends BaseEntity {
  @Column({ nullable: false })
  request_ID: string;

  @Column({ type: 'bytea', nullable: true })
  photo: Buffer;

  @Column({ nullable: true })
  photo_URL: string;

  @Column()
  photo_alt: string;

  @ManyToOne(() => RequestForProposal, (request) => request.fotos)
  @JoinColumn({ name: 'request_ID' })
  request: RequestForProposal;
}
