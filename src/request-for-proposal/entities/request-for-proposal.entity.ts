import { BaseEntity } from 'src/database/entities/baseEntity';
import { Proposal } from 'src/proposal/entities/proposal.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { RequestPhotos } from './request-photos.entity';
import { Request } from 'src/request/entities/request.entity';

@Entity()
export class RequestForProposal extends BaseEntity {
  @Column()
  corpID: string;
  @Column({ nullable: true, default: null })
  prestadorID: string;
  @Column({ nullable: true, default: null })
  jobID: string;
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
  @Column({ nullable: true })
  prazo: Date;
  @Column({ default: 'aberto' })
  status: string;

  @OneToMany(() => RequestPhotos, (f) => f.request)
  fotos: RequestPhotos[];

  @OneToMany(() => Proposal, (p) => p.rfp)
  proposals: Proposal[];

  @OneToOne(() => Request, (r) => r.rfp)
  request: Request;
}
