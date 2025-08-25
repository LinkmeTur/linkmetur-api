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
import { Contact } from '../../contacts/entities/contact.entity';
import { Job } from '../../job/entities/job.entity';
import { CorporationProfile } from './corporation-profile.entity';
import { RequestForProposal } from 'src/request-for-proposal/entities/request-for-proposal.entity';

@Entity('corporation')
@Index(['cnpj'], { unique: true })
@Index(['cidade', 'estado'])
@Index('IDX_CORPORATION_LOCALIZACAO', { synchronize: false })
export class Corporation extends BaseEntity {
  @Column({ nullable: true })
  logo_url: string;

  @Column({ type: 'char', length: 14, unique: true })
  cnpj: string;

  @Column({ type: 'varchar', length: 255 })
  razao_social: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nome_fantasia: string;

  @Column({ type: 'date' })
  data_inicio_atividade: string;

  @Column({ type: 'varchar', length: 7 })
  cnae_fiscal_principal: string;

  @Column({ type: 'varchar', length: 50 })
  tipo: string;

  @Column('text', { array: true, nullable: true })
  tags: string[];

  @Column({ type: 'varchar', length: 20 })
  telefone: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 10 })
  cep: string;

  @Column({ type: 'varchar', length: 255 })
  endereco: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  numero: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  bairro: string;

  @Column({ type: 'varchar', length: 100 })
  cidade: string;

  @Column({ type: 'char', length: 2 })
  estado: string;

  @Column({ type: 'varchar', length: 50, default: 'Brasil' })
  pais: string;

  @Column({ nullable: true }) // requer PostGIS
  localizacao: string;

  @Column({ type: 'uuid', nullable: true })
  profile_id: string;

  @OneToOne(() => CorporationProfile, (profile) => profile.corporation)
  @JoinColumn({ name: 'profile_id' })
  profile: CorporationProfile;

  @OneToMany(() => User, (user) => user.corporation)
  users: User[];

  @OneToMany(() => Job, (job) => job.corporation)
  jobs: Job[];

  @OneToMany(() => RequestForProposal, (rfp) => rfp.corporation)
  rfps: RequestForProposal[];

  @OneToMany(() => Contact, (contact) => contact.corporation)
  contacts: Contact[];
}
