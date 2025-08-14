import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Corporation } from 'src/corporations/entities/corporation.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { Contact } from 'src/contacts/entities/contact.entity';

@Entity('chat')
export class Chat extends BaseEntity {
  @Column({ type: 'text' })
  mensagem: string;

  @Column({ default: false })
  lida: boolean;

  @Column({ name: 'remetenteId' })
  remetenteId: string;

  @Column({ name: 'destinatarioId' })
  destinatarioId: string;

  @Column({ name: 'contactId', nullable: true })
  contactId: string;

  @ManyToOne(() => Corporation, (corp) => corp.mensagensEnviadas)
  @JoinColumn({ name: 'remetenteId' })
  remetente: Corporation;

  @ManyToOne(() => Corporation, (corp) => corp.mensagensRecebidas)
  @JoinColumn({ name: 'destinatarioId' })
  destinatario: Corporation;

  @ManyToOne(() => Contact, (contact) => contact.chats, { nullable: true })
  @JoinColumn({ name: 'contactId' })
  contato: Contact;
}
