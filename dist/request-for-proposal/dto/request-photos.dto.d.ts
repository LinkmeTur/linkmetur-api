import { CreateRequestForProposalDto } from './create-request-for-proposal.dto';
export declare class RequestPhotosDto {
    request_ID: string;
    photo: Buffer;
    photo_URL: string;
    photo_alt: string;
    request: CreateRequestForProposalDto;
}
