// src/proposal/dto/create-proposal.dto.ts
import {
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProposalPhotoDto } from './create-proposal-photo.dto';

export class CreateProposalDto {
  @IsString()
  rfp_id: string;

  @IsString()
  @IsOptional()
  resumo_proposta?: string;

  @IsNumber()
  valor_proposta: number;

  @IsString()
  @IsOptional()
  observacoes?: string;

  @IsOptional()
  @IsDate()
  prazo?: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProposalPhotoDto)
  @IsOptional()
  fotos?: CreateProposalPhotoDto[];
}
