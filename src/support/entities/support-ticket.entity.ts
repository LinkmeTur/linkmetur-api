// src/support/entities/support-ticket.entity.ts
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Corporation } from '../../corporations/entities/corporation.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { SupportMessage } from './support-message.entity';

@Entity('support_ticket')
export class SupportTicket extends BaseEntity {
  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid', nullable: true })
  corp_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Corporation, { nullable: true })
  @JoinColumn({ name: 'corp_id' })
  corporation: Corporation;

  @Column({ type: 'varchar', length: 100 })
  subject: string;

  @Column({ type: 'text' })
  message: string;

  @OneToMany(() => SupportMessage, (message) => message.ticket)
  messages: SupportMessage[];

  @Column({ type: 'varchar', length: 20 })
  status: string; // 'aberto', 'em andamento', 'resolvido', 'fechado'

  @Column({ type: 'varchar', length: 50 })
  priority: string; // 'baixa', 'média', 'alta', 'urgente'

  @Column({ type: 'varchar', length: 50 })
  category: string; // 'técnico', 'faturamento', 'funcionalidade', 'feedback'

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>; // IP, browser, página, etc
}
