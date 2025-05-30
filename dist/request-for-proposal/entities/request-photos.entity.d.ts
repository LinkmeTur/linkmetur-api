import { RequestForProposal } from './request-for-proposal.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
export declare class RequestPhotos extends BaseEntity {
    request_ID: string;
    photo: Buffer;
    photo_URL: string;
    photo_alt: string;
    request: RequestForProposal;
}
