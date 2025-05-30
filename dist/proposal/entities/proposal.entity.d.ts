import { BaseEntity } from 'src/database/entities/baseEntity';
import { RequestForProposal } from 'src/request-for-proposal/entities/request-for-proposal.entity';
import { ProposalPhotos } from './proposal-photos.entity';
export declare class Proposal extends BaseEntity {
    reqId: string;
    corpID: string;
    resumo_proposta: string;
    valor_proposta: string;
    observações: string;
    prazo: Date;
    status: string;
    request: RequestForProposal;
    fotos: ProposalPhotos[];
}
