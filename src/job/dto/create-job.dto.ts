import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { JobPhotos } from '../entities/job_photos.entity';

export class CreateJobDto {
  @IsString({ message: 'O corp_Id deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O corp_Id é obrigatório.' })
  corp_Id: string;

  @IsString({ message: 'O servico deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O servico é obrigatório.' })
  nome_servico: string;

  @IsString({ message: 'A categoria deve ser uma string válida.' })
  @IsNotEmpty({ message: 'A categoria é obrigatória.' })
  categoria: string;

  @IsString({ message: 'A sub_categoria deve ser uma string válida.' })
  sub_categoria: string;

  @IsString({ message: 'A descrição deve ser uma string válida.' })
  descricao: string;

  @IsNumber({}, { message: 'O valor mínimo deve ser um número.' })
  @IsNotEmpty({ message: 'O valor mínimo é obrigatório.' })
  min_valor: number;

  @IsNumber({}, { message: 'O valor máximo deve ser um número.' })
  @IsNotEmpty({ message: 'O valor máximo é obrigatório.' })
  max_valor: number;

  @IsOptional()
  @IsString({ message: 'A URL do vídeo deve ser uma string válida.' })
  video_url?: string;

  @IsOptional()
  @IsString({ message: 'As certificações devem ser uma string válida.' })
  certificacoes?: string;

  @IsString({ message: 'A disponibilidade deve ser uma string válida.' })
  @IsNotEmpty({ message: 'A disponibilidade é obrigatória.' })
  disponibilidade: string;

  @IsBoolean({ message: 'O campo publicado deve ser um valor booleano.' })
  @IsNotEmpty({ message: 'O campo publicado é obrigatório.' })
  publicado: boolean;

  @IsArray({ message: 'As fotos devem ser um array válido.' })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => JobPhotos)
  photos?: JobPhotos[];
}
