import { BaseEntity } from 'src/database/entities/baseEntity';
import { Proposal } from 'src/proposal/entities/proposal.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { RequestPhotos } from './request-photos.entity';
@Entity()
export class RequestForProposal extends BaseEntity {
  @Column()
  corpID: string;
  @Column()
  titulo: string;
  @Column()
  descricao: string;
  @Column()
  detalhes: string;
  @Column()
  valor_medio: string;
  @Column()
  tipo: string;

  @OneToMany(() => RequestPhotos, (f) => f.request)
  fotos: RequestPhotos[];

  @OneToMany(() => Proposal, (p) => p.request)
  proposals: Proposal[];
}
