import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('authentication')
export class Authentication {
  @PrimaryColumn('uuid')
  user_id: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'text', nullable: true })
  token_recuperacao: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  expiracao_token: Date | null;

  @Column({ type: 'boolean', default: false })
  email_verificado: boolean;

  @Column({ type: 'text', nullable: true })
  codigo_2fa: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  expiracao_2fa: Date | null;

  @Column({ type: 'boolean', default: false })
  dois_fatores_ativo: boolean;

  @Column({ type: 'text', array: true, default: [] })
  dispositivos_confiaveis: string[]; // IPs ou fingerprints
}
