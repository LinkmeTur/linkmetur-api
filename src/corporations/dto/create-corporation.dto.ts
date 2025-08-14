// src/corporation/dto/create-corporation.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { CorporationTipo } from '../entities/corporation.entity';

export class CreateCorporationDto {
  @IsString()
  @IsNotEmpty()
  razao_social: string;

  @IsString({ message: 'CNPJ inválido' })
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  natureza_juridica: string;

  @IsOptional()
  @IsString()
  nome_fantasia?: string;

  @IsString()
  @IsNotEmpty()
  data_inicio_atividade: string;

  @IsString()
  @IsNotEmpty()
  cnae_fiscal_principal: string;

  @IsIn([CorporationTipo.TURISMO, CorporationTipo.PRESTADOR])
  tipo: CorporationTipo;

  @IsOptional()
  @IsString()
  tags?: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  cep: string;

  @IsString()
  @IsNotEmpty()
  endereco: string;

  @IsOptional()
  @IsString()
  numero?: string;

  @IsOptional()
  @IsString()
  bairro?: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsString()
  @IsNotEmpty()
  pais: string;

  @IsString()
  @IsNotEmpty()
  localizacao: string; // "lat,lng"

  @IsOptional()
  @IsString()
  logo_url?: string;
}
