import { BaseEntity } from 'src/database/entities/baseEntity';
import { Proposal } from 'src/proposal/entities/proposal.entity';
import { RequestForProposal } from 'src/request-for-proposal/entities/request-for-proposal.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Request extends BaseEntity {
  @Column()
  jobID: string;

  @Column()
  nome_job: string;

  @Column()
  corpID: string;

  @Column()
  nome_corp: string;

  @Column()
  prestadorID: string;

  @Column()
  nome_prestador: string;

  @Column()
  rfpID: string;

  @OneToOne(() => RequestForProposal, (r) => r.request)
  @JoinColumn({ name: 'rfpID' })
  rfp: RequestForProposal;

  @Column()
  proposalID: string;

  @OneToOne(() => Proposal, (p) => p.request)
  @JoinColumn({ name: 'proposalID' })
  proposal: Proposal;

  @Column()
  prazo: Date;

  @Column()
  status: string;
}
