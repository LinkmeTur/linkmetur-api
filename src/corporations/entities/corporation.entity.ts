// src/corporation/entities/corporation.entity.ts
import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../database/entities/baseEntity';
import { User } from '../../users/entities/user.entity';
import { Chat } from '../../chats/entities/chat.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { Job } from '../../job/entities/job.entity';
import { CorporationProfile } from '../../corporation-profile/entities/corporation-profile.entity';
import { Notification } from 'src/notification/entities/notification.entity';

export enum CorporationTipo {
  TURISMO = 'T',
  PRESTADOR = 'P',
}

@Index('IDX_CORP_CNPJ', ['cnpj'], { unique: true })
@Index('IDX_CORP_TIPO', ['tipo'])
@Index('IDX_CORP_CIDADE', ['cidade'])
@Index('IDX_CORP_ESTADO', ['estado'])
@Entity('corporation')
export class Corporation extends BaseEntity {
  @Column({ nullable: true })
  logo_url: string;

  @Index({ unique: true })
  @Column()
  cnpj: string;

  @Column()
  razao_social: string;

  @Column()
  natureza_juridica: string;

  @Column({ nullable: true })
  nome_fantasia: string;

  @Column()
  data_inicio_atividade: string;

  @Column()
  cnae_fiscal_principal: string;

  @Index()
  @Column()
  tipo: string;

  @Column({ nullable: true })
  tags: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  @Column()
  cep: string;

  @Column()
  endereco: string;

  @Column({ nullable: true })
  numero: string;

  @Column({ nullable: true })
  bairro: string;

  @Index()
  @Column()
  cidade: string;

  @Index()
  @Column()
  estado: string;

  @Column()
  pais: string;

  @Column()
  localizacao: string;

  @Column({ nullable: true })
  profileId: string;

  @OneToOne(() => CorporationProfile, (profile) => profile.corp)
  @JoinColumn({ name: 'profileId' })
  profile: CorporationProfile;

  @OneToMany(() => User, (user) => user.corp)
  users: Array<User>;

  @OneToMany(() => Chat, (chat) => chat.remetente)
  mensagensEnviadas: Array<Chat>;

  @OneToMany(() => Chat, (chat) => chat.destinatario)
  mensagensRecebidas: Array<Chat>;

  @OneToMany(() => Contact, (contato) => contato.corporation)
  contatos: Array<Contact>;

  @OneToMany(() => Notification, (n) => n.corp)
  notifications: Array<Notification>;

  @OneToMany(() => Job, (job) => job.corp)
  jobs: Array<Job>;
}
