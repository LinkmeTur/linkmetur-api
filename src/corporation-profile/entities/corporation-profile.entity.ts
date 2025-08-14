import { Corporation } from 'src/corporations/entities/corporation.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('corporation_profile')
export class CorporationProfile extends BaseEntity {
  @Column({ name: 'corpId', unique: true })
  corpId: string;

  @Column({ nullable: true })
  banner_url: string; // corrigido: Wallpaper_Url → banner_url

  @Column({ nullable: true })
  site: string;

  @Column({ type: 'text', nullable: true })
  descricao: string; // pode ser usado para SEO

  @Column({ type: 'text', nullable: true })
  sobre: string; // focado no "sobre a empresa"

  @Column({ type: 'jsonb', nullable: true })
  horario: {
    segunda: string;
    terca: string;
    quarta: string;
    quinta: string;
    sexta: string;
    sabado?: string;
    domingo?: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  certificacoes: Array<{
    nome: string;
    orgao: string;
    ano: number;
    url?: string;
  }>;

  // Redes sociais como campos separados (melhor que string única)
  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  linkedin: string;

  @Column({ nullable: true })
  youtube: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ type: 'jsonb', nullable: true })
  galeria: Array<{ url: string; descricao?: string }>;

  @OneToOne(() => Corporation, (corp) => corp.profile)
  @JoinColumn({ name: 'corpId' })
  corp: Corporation;
}
