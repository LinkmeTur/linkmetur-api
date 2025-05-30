import { BaseEntity } from 'src/database/entities/baseEntity';
import { Proposal } from 'src/proposal/entities/proposal.entity';
import { RequestPhotos } from './request-photos.entity';
export declare class RequestForProposal extends BaseEntity {
    corpID: string;
    titulo: string;
    descricao: string;
    detalhes: string;
    valor_medio: string;
    tipo: string;
    fotos: RequestPhotos[];
    proposals: Proposal[];
}
