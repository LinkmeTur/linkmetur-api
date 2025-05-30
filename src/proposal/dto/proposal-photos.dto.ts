import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { CreateProposalDto } from './create-proposal.dto';

export class ProposalPhotosDto {
  @IsNotEmpty()
  @IsString()
  proposal_ID: string;

  @IsOptional()
  photo: Buffer;

  @IsOptional()
  @IsUrl()
  photo_URL: string;

  @IsNotEmpty()
  @IsString()
  photo_alt: string;

  @IsOptional()
  proposal: CreateProposalDto;
}
