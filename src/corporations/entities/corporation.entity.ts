import { Chat } from 'src/chats/entities/chat.entity';
import { Contact } from 'src/contacts/entities/contact.entity';
import { CorporationProfile } from 'src/corporation-profile/entities/corporation-profile.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { Job } from 'src/job/entities/job.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Corporation extends BaseEntity {
  @Column({ nullable: true })
  logo_url: string;

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

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  pais: string;

  @Column()
  localizacao: string;

  @OneToOne(() => CorporationProfile, (pro) => pro.corp)
  @JoinColumn({ foreignKeyConstraintName: 'fk_corp_profile' })
  profile: CorporationProfile;

  @OneToMany(() => User, (user) => user.corp)
  users: Array<User>;

  @OneToMany(() => Chat, (chat) => chat.remetente)
  mensagensEnviadas: Array<Chat>;

  @OneToMany(() => Chat, (chat) => chat.destinatario)
  mensagensRecebidas: Array<Chat>;

  @OneToMany(() => Contact, (cont) => cont.contato)
  contatos: Array<Contact>;

  @OneToMany(() => Job, (j) => j.corp)
  jobs: Array<Job>;
}
