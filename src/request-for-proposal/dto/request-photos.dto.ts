import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { CreateRequestForProposalDto } from './create-request-for-proposal.dto';

export class RequestPhotosDto {
  @IsNotEmpty()
  @IsString()
  request_ID: string;

  @IsOptional()
  @IsUrl()
  photo_URL: string;

  @IsNotEmpty()
  @IsString()
  photo_alt: string;

  @IsOptional()
  request: CreateRequestForProposalDto;
}
