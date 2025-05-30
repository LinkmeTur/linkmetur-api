import { RequestPhotosDto } from './request-photos.dto';
import { CreateProposalDto } from 'src/proposal/dto/create-proposal.dto';
export declare class CreateRequestForProposalDto {
    corpID: string;
    titulo: string;
    descricao: string;
    detalhes: string;
    valor_medio: string;
    tipo: string;
    fotos: RequestPhotosDto[];
    proposals: CreateProposalDto[];
}
