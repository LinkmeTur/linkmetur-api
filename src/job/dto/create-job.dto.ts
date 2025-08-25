// src/jobs/dto/create-job.dto.ts
import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  ValidateNested,
  IsEnum,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateJobPhotosDto } from './create-job-photos.dto';

export class CreateJobDto {
  @IsString()
  nome_servico: string;

  @IsString()
  categoria: string;

  @IsString()
  sub_categoria: string;

  @IsString()
  descricao: string;

  @IsNumber()
  min_valor: number;

  @IsNumber()
  max_valor: number;

  @IsUrl()
  video_url: string;

  @IsArray()
  @IsString({ each: true })
  certificacoes: string[];

  @IsString()
  @IsEnum(['disponível', 'indisponível', 'sob consulta'])
  disponibilidade: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateJobPhotosDto)
  fotos?: CreateJobPhotosDto[];

  // O `corp_id` virá do contexto (JWT ou header), não do body
}
