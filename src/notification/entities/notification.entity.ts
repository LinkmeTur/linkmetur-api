// src/notification/entities/notification.entity.ts
// src/notifications/entities/notification.entity.ts
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
  @Column({ type: 'uuid' })
  corp_id: string;

  @ManyToOne(() => Corporation)
  @JoinColumn({ name: 'corp_id' })
  corporation: Corporation;

  @Column({ type: 'text' })
  mensagem: string;

  @Column({ type: 'text' })
  titulo: string;

  @Column({ type: 'boolean', default: false })
  lida: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  tipo: string; // 'alerta', 'convite', 'proposta', 'mensagem', 'pedido_aceito'

  @Column({ type: 'text', nullable: true })
  link: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;
}
