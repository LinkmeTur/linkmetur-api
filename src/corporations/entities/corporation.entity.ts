import { BaseEntity } from 'src/database/entities/baseEntity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class Corporation extends BaseEntity {
  @Column({ nullable: true })
  logo_url: string;

  @Column({ type: 'bytea', nullable: true })
  logo: Buffer;

  @Column()
  cnpj: string;

  @Column()
  razao_social: string;

  @Column()
  natureza_juridica: string;

  @Column()
  nome_fantasia: string;

  @Column()
  data_inicio_atividade: string;

  @Column()
  cnae_fiscal_principal: string;

  @Column()
  tipo: string;

  @Column()
  tags: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  @Column()
  cep: string;

  @Column()
  endereco: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  pais: string;

  @Column()
  localizacao: string;

  @OneToMany(() => User, (user) => user.corp)
  users: Array<User>;
}
