import { BaseEntity } from 'src/database/entities/baseEntity';
import { RequestForProposal } from 'src/request-for-proposal/entities/request-for-proposal.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ProposalPhotos } from './proposal-photos.entity';
@Entity()
export class Proposal extends BaseEntity {
  @Column()
  reqId: string;
  @Column()
  corpID: string;
  @Column()
  resumo_proposta: string;
  @Column()
  valor_proposta: string;
  @Column()
  observações: string;
  @Column()
  prazo: Date;
  @Column()
  status: string;
  @ManyToOne(() => RequestForProposal, (r) => r.proposals)
  request: RequestForProposal;
  @OneToMany(() => ProposalPhotos, (f) => f.proposal)
  fotos: ProposalPhotos[];
}
