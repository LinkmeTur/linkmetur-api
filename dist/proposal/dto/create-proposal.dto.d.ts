import { CreateRequestForProposalDto } from 'src/request-for-proposal/dto/create-request-for-proposal.dto';
import { ProposalPhotosDto } from './proposal-photos.dto';
export declare class CreateProposalDto {
    reqId: string;
    corpID: string;
    resumo_proposta: string;
    valor_proposta: string;
    observações: string;
    prazo: Date;
    status: string;
    request: CreateRequestForProposalDto;
    fotos: ProposalPhotosDto[];
}
