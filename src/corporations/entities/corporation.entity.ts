import { BaseEntity } from 'src/database/entities/baseEntity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Corporation extends BaseEntity {
  @Column()
  cnpj: number;
  @Column()
  corporate_name: string;
  @Column()
  trade_name: string;
  @Column()
  state_registration: number;
  @Column()
  share_capital: number;
  @Column()
  size: string;
  @Column()
  registration_status_date: string;
  @Column()
  country: string;
  @Column()
  address: string;
}
