import { Corporation } from 'src/corporations/entities/corporation.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class CorporationProfile extends BaseEntity {
  @Column()
  corpID: string;
  @Column({ nullable: true })
  Wallpaper_Url: string;
  @Column({ nullable: true })
  site: string;
  @Column({ nullable: true })
  descricao: string;
  @Column({ nullable: true })
  sobre: string;
  @Column({ nullable: true })
  horario: string;
  @Column({ nullable: true })
  certificacoes: string;
  @Column({ nullable: true })
  redesSociais: string;

  @OneToOne(() => Corporation, (corp) => corp.profile)
  corp: Corporation;
}
