import { Corporation } from 'src/corporations/entities/corporation.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: true })
  avatar_url: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  telefone: string;

  @Column()
  nivel: number;

  @Column()
  corpId: string;

  @ManyToOne(() => Corporation, (corp) => corp.users)
  @JoinColumn({ name: 'corpId' })
  corp: Corporation;
}
