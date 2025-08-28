// src/support/entities/support-message.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SupportTicket } from './support-ticket.entity';
import { User } from '../../users/entities/user.entity';

import { BaseEntity } from 'src/database/entities/baseEntity';

@Entity('support_message')
export class SupportMessage extends BaseEntity {
  @Column({ type: 'uuid' })
  ticket_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => SupportTicket, (ticket) => ticket.messages)
  @JoinColumn({ name: 'ticket_id' })
  ticket: SupportTicket;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'text', nullable: true })
  attachment_url: string;
}
