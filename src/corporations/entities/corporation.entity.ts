import { BaseEntity } from 'src/database/entities/baseEntity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class Corporation extends BaseEntity {
  @Column()
  cnpj: string;

  @Column()
  razao_social: string;

  @Column()
  natureza_juridica: string;

  @Column()
  nome_fantasia: string;

  @Column()
  pais: string;

  @Column()
  endereco: string;

  @Column()
  data_inicio_atividade: string;

  @Column()
  cnae_fiscal_principal: string;

  @Column()
  cnae_fiscal_secundaria: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  @Column()
  socios: string;

  @OneToMany(() => User, (user) => user.corp)
  users: Array<User>;
}
