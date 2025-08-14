import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import bcrypt from 'bcrypt';

@Entity('authentication')
export class Authentication {
  @PrimaryColumn()
  userId: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ length: 255 })
  hash_senha: string;

  @Column({ nullable: true })
  token_recuperacao: string;

  @Column({ nullable: true })
  expiracao_token: Date;

  @Column({ default: false })
  email_verificado: boolean;

  @Column({ nullable: true })
  codigo_2fa: string;

  @Column({ default: false })
  dois_fatores_ativo: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashRecoveryToken() {
    if (this.token_recuperacao && !this.token_recuperacao.startsWith('$2b$')) {
      const rounds = 10;
      this.token_recuperacao = await bcrypt.hash(
        this.token_recuperacao,
        rounds,
      );
    }
  }

  async validateRecoveryToken(token: string): Promise<boolean> {
    return bcrypt.compare(token, this.token_recuperacao);
  }
}
