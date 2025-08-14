// src/corporation-profile/dto/create-corporation-profile.dto.ts
import {
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsObject,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class GalleryItem {
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  descricao?: string;
}

class Certification {
  @IsString()
  nome: string;

  @IsString()
  orgao: string;

  @IsNumber()
  ano: number;

  @IsOptional()
  @IsString()
  url?: string;
}

class Schedule {
  @IsString()
  segunda: string;

  @IsString()
  terca: string;

  @IsString()
  quarta: string;

  @IsString()
  quinta: string;

  @IsString()
  sexta: string;

  @IsOptional()
  @IsString()
  sabado?: string;

  @IsOptional()
  @IsString()
  domingo?: string;
}

export class CreateCorporationProfileDto {
  @IsOptional()
  @IsString()
  banner_url?: string;

  @IsOptional()
  @IsString()
  site?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  sobre?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Schedule)
  horario?: Schedule;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Certification)
  certificacoes?: Certification[];

  // ✅ Campos soltos, alinhados com a entidade
  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

  @IsOptional()
  @IsString()
  youtube?: string;

  @IsOptional()
  @IsString()
  twitter?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GalleryItem)
  galeria?: GalleryItem[];
}
