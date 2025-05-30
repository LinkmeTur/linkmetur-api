import { IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';
import { CreateRequestForProposalDto } from 'src/request-for-proposal/dto/create-request-for-proposal.dto';
import { ProposalPhotosDto } from './proposal-photos.dto';
export class CreateProposalDto {
  @IsNotEmpty()
  @IsString()
  reqId: string;

  @IsNotEmpty()
  @IsString()
  corpID: string;

  @IsNotEmpty()
  @IsString()
  resumo_proposta: string;

  @IsNotEmpty()
  @IsString()
  valor_proposta: string;

  @IsOptional()
  @IsString()
  observações: string;

  @IsNotEmpty()
  @IsDate()
  prazo: Date;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  request: CreateRequestForProposalDto;

  @IsOptional()
  fotos: ProposalPhotosDto[];
}
