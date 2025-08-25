// dto/create-corporation.dto.ts
import {
  IsString,
  Length,
  IsOptional,
  IsArray,
  ValidateNested,
  IsPostalCode,
  IsEmail,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCorporationProfileDto } from './create-corporation-profile.dto';

export class CreateCorporationDto {
  @IsString()
  @Length(14, 14)
  cnpj: string;

  @IsString()
  @Length(2, 255)
  razao_social: string;

  @IsString()
  @Length(2, 255)
  @IsOptional()
  nome_fantasia?: string;

  @IsString()
  data_inicio_atividade: string;

  @IsString()
  @Length(7, 7)
  cnae_fiscal_principal: string;

  @IsString()
  @Length(2, 50)
  tipo: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  tags?: string[];

  @IsString()
  @Length(10, 20)
  telefone: string;

  @IsEmail()
  email: string;

  @IsPostalCode('BR')
  cep: string;

  @IsString()
  @Length(5, 255)
  endereco: string;

  @IsString()
  @IsOptional()
  numero?: string;

  @IsString()
  @IsOptional()
  bairro?: string;

  @IsString()
  @Length(2, 100)
  cidade: string;

  @IsString()
  @Length(2, 2)
  estado: string;

  @IsString()
  @IsOptional()
  pais?: string;

  @IsObject()
  @IsOptional()
  localizacao?: {
    x: number; // longitude
    y: number; // latitude
  };
  @ValidateNested()
  @Type(() => CreateCorporationProfileDto)
  @IsOptional()
  profile?: CreateCorporationProfileDto;
}
