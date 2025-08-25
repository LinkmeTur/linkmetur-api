import { Authentication } from 'src/authentications/entities/authentication.entity';
import { Corporation } from 'src/corporations/entities/corporation.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'text' }) // armazena hash
  hash_senha: string;

  @Column({ type: 'varchar', length: 20 })
  telefone: string;

  @Column({ type: 'text', nullable: true })
  avatar_url: string;

  @Column({ type: 'integer' })
  nivel: number;

  @Column({ type: 'uuid' })
  corp_id: string;

  @ManyToOne(() => Corporation, (corporation) => corporation.users)
  corporation: Corporation;

  @OneToOne(() => Authentication, { cascade: true })
  @JoinColumn({ name: 'id' }) // user.id = authentication.user_id
  authentication: Authentication;
}
