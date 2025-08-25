// src/request-for-proposal/entities/request-photos.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RequestForProposal } from './request-for-proposal.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';

@Entity('request_photos')
export class RequestPhotos extends BaseEntity {
  @Column({ type: 'uuid', name: 'request_ID' })
  request_id: string;

  @Column({ type: 'text', name: 'photo_URL', nullable: true })
  photo_URL: string;

  @Column({ type: 'varchar', length: 255, name: 'photo_alt', nullable: true })
  photo_alt: string;

  @ManyToOne(() => RequestForProposal, (rfp) => rfp.fotos)
  @JoinColumn({ name: 'request_ID' })
  rfp: RequestForProposal;
}
