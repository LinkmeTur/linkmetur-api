import { BaseEntity } from 'src/database/entities/baseEntity';
import { Proposal } from './proposal.entity';
export declare class ProposalPhotos extends BaseEntity {
    proposal_ID: string;
    photo: Buffer;
    photo_URL: string;
    photo_alt: string;
    proposal: Proposal;
}
