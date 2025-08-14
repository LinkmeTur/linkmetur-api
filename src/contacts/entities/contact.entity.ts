import { Chat } from 'src/chats/entities/chat.entity';
import { Corporation } from 'src/corporations/entities/corporation.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Contact extends BaseEntity {
  @Column()
  corporationID: string;

  @Column()
  contactID: string;

  @Column({ default: false })
  block_contact: boolean;

  @Column({ default: false })
  saved_contact: boolean;

  @Column({ default: false })
  favorited_contact: boolean;

  @ManyToOne(() => Corporation, (corp) => corp.contatos)
  corporation: Corporation;

  @ManyToOne(() => Corporation)
  contato: Corporation;

  @OneToMany(() => Chat, (chat) => chat.contato)
  chats: Chat[];
}
