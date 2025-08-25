import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Corporation } from 'src/corporations/entities/corporation.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { Contact } from 'src/contacts/entities/contact.entity';

@Entity('chat')
export class Chat extends BaseEntity {
  @Column({ type: 'uuid' })
  remetente_id: string;

  @Column({ type: 'uuid' })
  destinatario_id: string;

  @Column({ type: 'uuid', nullable: true })
  contact_id: string;

  @ManyToOne(() => Corporation, { eager: true })
  @JoinColumn({ name: 'remetente_id' })
  remetente: Corporation;

  @ManyToOne(() => Corporation, { eager: true })
  @JoinColumn({ name: 'destinatario_id' })
  destinatario: Corporation;

  @ManyToOne(() => Contact, { nullable: true })
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @Column({ type: 'varchar', length: 100 })
  remetente_nome: string;

  @Column({ type: 'text' }) // conteúdo criptografado
  conteudo: string;

  @Column({ type: 'bytea' })
  iv: Buffer; // initialization vector

  @Column({ type: 'boolean', default: false })
  lida: boolean;
}
