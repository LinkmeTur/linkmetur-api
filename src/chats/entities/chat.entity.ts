import { Column, Entity, ManyToOne } from 'typeorm';
import { Corporation } from 'src/corporations/entities/corporation.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';

@Entity()
export class Chat extends BaseEntity {
  @Column()
  remetenteID: string;

  @Column()
  remetenteNome: string;

  @Column()
  destinatarioID: string;

  @Column()
  conteudo: Buffer;

  @Column({ type: 'bytea' })
  iv: Buffer;

  @ManyToOne(() => Corporation, (corporation) => corporation.mensagensEnviadas)
  remetente: Corporation;

  @ManyToOne(() => Corporation, (corporation) => corporation.mensagensRecebidas)
  destinatario: Corporation;
}
