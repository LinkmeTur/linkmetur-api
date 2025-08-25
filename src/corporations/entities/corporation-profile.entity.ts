import { Corporation } from 'src/corporations/entities/corporation.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('corporation_profile')
export class CorporationProfile extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  corp_id: string;

  @Column({ type: 'text', nullable: true })
  logo_url: string;

  @Column({ type: 'text', nullable: true })
  banner_url: string;

  @Column({ type: 'text', nullable: true })
  site: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ type: 'text', nullable: true })
  sobre: string;

  @Column({ type: 'jsonb', nullable: true })
  horario: Record<string, string>;

  @Column({ type: 'text', array: true, nullable: true })
  galeria: string[];

  @Column({ type: 'text', nullable: true })
  instagram: string;

  @Column({ type: 'text', nullable: true })
  facebook: string;

  @Column({ type: 'text', nullable: true })
  linkedin: string;

  @Column({ type: 'text', nullable: true })
  youtube: string;

  @Column({ type: 'text', nullable: true })
  twitter: string;

  @Column({ type: 'text', array: true, nullable: true })
  certificacoes: string[];

  @OneToOne(() => Corporation, (corporation) => corporation.profile, {
    cascade: true,
  })
  @JoinColumn({ name: 'corp_id' })
  corporation: Corporation;
}
