import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RequestPhotosDto } from './request-photos.dto';
import { CreateProposalDto } from 'src/proposal/dto/create-proposal.dto';

export class CreateRequestForProposalDto {
  @IsNotEmpty()
  @IsString()
  corpID: string;

  @IsString()
  prestadorID: string;

  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsOptional()
  @IsString()
  detalhes: string;

  @IsOptional()
  @IsString()
  valor_medio: string;

  @IsOptional()
  @IsString()
  tipo: string;

  @IsOptional()
  fotos: RequestPhotosDto[];

  @IsOptional()
  proposals: CreateProposalDto[];
}
