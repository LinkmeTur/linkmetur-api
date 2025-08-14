// src/notification/entities/notification.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../database/entities/baseEntity';
import { Corporation } from 'src/corporations/entities/corporation.entity';

/**
 * Notificação para o usuário
 *
 * Ex: nova proposta, mensagem, pedido aceito, etc.
 */
@Entity('notification')
export class Notification extends BaseEntity {
  @Column({ type: 'text' })
  mensagem: string;

  @Column({ default: false })
  lida: boolean;

  @Column({ name: 'corpId' })
  corpId: string;

  @ManyToOne(() => Corporation, (c) => c.notifications, { nullable: true })
  @JoinColumn({ name: 'corpId' })
  corp: Corporation;

  @Column({ nullable: true })
  tipo: string; // 'proposta', 'mensagem', 'pedido', 'sistema'

  @Column({ nullable: true })
  link: string; // redirecionamento

  @Column({ nullable: true })
  metadata: string; // dados extras (ex: requestId, proposalId)
}
