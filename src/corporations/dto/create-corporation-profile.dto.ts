// dto/create-corporation-profile.dto.ts
import { IsString, IsUrl, IsOptional, IsArray, IsJSON } from 'class-validator';

export class CreateCorporationProfileDto {
  @IsUrl({ protocols: ['http', 'https'] })
  @IsOptional()
  logo_url?: string;

  @IsUrl({ protocols: ['http', 'https'] })
  @IsOptional()
  banner_url?: string;

  @IsUrl({ protocols: ['http', 'https'] })
  @IsOptional()
  site?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  @IsOptional()
  sobre?: string;

  @IsJSON({ each: true })
  @IsOptional()
  horario?: Record<string, string>;

  @IsArray({ each: true })
  @IsUrl({ protocols: ['http', 'https'] })
  @IsOptional()
  galeria?: string[];

  @IsUrl()
  @IsOptional()
  instagram?: string;

  @IsUrl()
  @IsOptional()
  facebook?: string;

  @IsUrl()
  linkedin?: string;

  @IsUrl()
  @IsOptional()
  youtube?: string;

  @IsUrl()
  @IsOptional()
  twitter?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  certificacoes?: string[];
}
