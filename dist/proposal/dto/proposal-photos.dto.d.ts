import { CreateProposalDto } from './create-proposal.dto';
export declare class ProposalPhotosDto {
    proposal_ID: string;
    photo: Buffer;
    photo_URL: string;
    photo_alt: string;
    proposal: CreateProposalDto;
}
