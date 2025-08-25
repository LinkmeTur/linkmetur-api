// dto/create-proposal.dto.ts
import {
  IsString,
  IsUUID,
  IsDecimal,
  IsOptional,
  IsDate,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProposalPhotosDto } from './proposal-photos.dto';

export class CreateProposalDto {
  @IsString()
  @IsUUID()
  rfp_id: string;

  @IsString()
  @IsUUID()
  corp_id: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  user_id?: string;

  @IsString()
  @IsOptional()
  resumo_proposta?: string;

  @IsDecimal({ decimal_digits: '2' })
  valor_proposta: number;

  @IsString()
  @IsOptional()
  observacoes?: string;

  @IsDate()
  @IsOptional()
  prazo?: Date;

  @IsString()
  @IsOptional()
  status?: string; // 'enviada'

  @IsBoolean()
  @IsOptional()
  selecionado?: boolean;

  @ValidateNested({ each: true })
  @Type(() => CreateProposalPhotosDto)
  @IsOptional()
  fotos?: CreateProposalPhotosDto[];
}
