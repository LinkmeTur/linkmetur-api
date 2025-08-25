// src/request-for-proposal/dto/create-rfp.dto.ts
import {
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
  IsEnum,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRequestPhotoDto } from './create-request-photo.dto';

export class CreateRfpDto {
  @IsString()
  titulo: string;

  @IsString()
  descricao: string;

  @IsString()
  detalhes: string;

  @IsNumber()
  valor_medio: number;

  @IsString()
  @IsEnum(['aberto', 'fechado', 'direcionado'])
  tipo: string;

  @IsOptional()
  @IsDate()
  prazo?: Date;

  @IsOptional()
  @IsString()
  job_id?: string;

  @IsOptional()
  @IsString()
  prestador_id?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRequestPhotoDto)
  @IsOptional()
  fotos?: CreateRequestPhotoDto[];
}
