import { BaseEntity } from 'src/database/entities/baseEntity';
import { RequestForProposal } from 'src/request-for-proposal/entities/request-for-proposal.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { ProposalPhotos } from './proposal-photos.entity';
import { Request } from 'src/request/entities/request.entity';
@Entity()
export class Proposal extends BaseEntity {
  @Column()
  reqId: string;
  @Column()
  corpID: string;
  @Column()
  prestadorID: string;
  @Column({ nullable: true, default: null })
  resumo_proposta: string;
  @Column()
  valor_proposta: string;
  @Column({ nullable: true, default: null })
  observações: string;
  @Column({ nullable: true, default: null })
  prazo: Date;
  @Column({ default: 'enviado' })
  status: string;
  @Column({ default: false })
  selecionado: boolean;
  @ManyToOne(() => RequestForProposal, (rfp) => rfp.proposals)
  rfp: RequestForProposal;
  @OneToMany(() => ProposalPhotos, (f) => f.proposal)
  fotos: ProposalPhotos[];
  @OneToOne(() => Request, (r) => r.proposal)
  request: Request;
}
