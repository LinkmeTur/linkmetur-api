// src/corporation/dto/create-corporation.dto.ts
import { IsString, IsOptional, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCorporationDto {
  @IsString({ message: 'O CNPJ deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O CNPJ é obrigatório.' })
  cnpj: string;

  @IsString({ message: 'A razão social deve ser uma string válida.' })
  @IsNotEmpty({ message: 'A razão social é obrigatória.' })
  razao_social: string;

  @IsString({ message: 'A natureza jurídica deve ser uma string válida.' })
  @IsNotEmpty({ message: 'A natureza jurídica é obrigatória.' })
  natureza_juridica: string;

  @IsString({ message: 'O nome fantasia deve ser uma string válida.' })
  @IsOptional()
  nome_fantasia: string;

  @IsString({ message: 'A data de início deve ser uma string válida.' })
  @IsNotEmpty({ message: 'A data de início da atividade é obrigatória.' })
  data_inicio_atividade: string;

  @IsString({ message: 'O CNAE fiscal deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O CNAE fiscal principal é obrigatório.' })
  cnae_fiscal_principal: string;

  @IsString({ message: 'O telefone deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  telefone: string;

  @IsEmail({}, { message: 'O e-mail deve ser um endereço válido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email: string;

  @IsString({ message: 'O CEP deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O CEP é obrigatório.' })
  cep: string;

  @IsString({ message: 'O endereço deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O endereço é obrigatório.' })
  endereco: string;

  @IsString({ message: 'O endereço deve ser uma string válida.' })
  @IsOptional()
  numero: string;

  @IsString({ message: 'O endereço deve ser uma string válida.' })
  @IsOptional()
  bairro: string;

  @IsString({ message: 'A cidade deve ser uma string válida.' })
  @IsNotEmpty({ message: 'A cidade é obrigatória.' })
  cidade: string;

  @IsString({ message: 'O estado deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O estado é obrigatório.' })
  estado: string;

  @IsString({ message: 'O país deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O país é obrigatório.' })
  pais: string;

  @IsString()
  @IsNotEmpty()
  localizacao: string;

  @IsString()
  @IsNotEmpty()
  tipo: 'T' | 'P';

  @IsString()
  @IsOptional()
  tags: string;

  // Validação para garantir que apenas uma das opções seja preenchida
  @IsOptional()
  logo_url: string;
}
