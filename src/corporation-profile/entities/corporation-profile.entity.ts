import { Corporation } from 'src/corporations/entities/corporation.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class CorporationProfile extends BaseEntity {
  @Column()
  corpID: string;
  @Column()
  descricao: string;
  @OneToOne(() => Corporation, (corp) => corp.profile)
  corp: Corporation;
}
