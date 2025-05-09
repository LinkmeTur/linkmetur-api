import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCorporationDto {
  @IsNotEmpty({ message: 'CNPJ é obrigatório' })
  @IsString({ message: 'CNPJ deve ser uma string' })
  cnpj: string;

  @IsNotEmpty({ message: 'Razão Social é obrigatória' })
  @IsString({ message: 'Razão Social deve ser uma string' })
  razao_social: string;

  @IsNotEmpty({ message: 'Natureza Jurídica é obrigatória' })
  @IsString({ message: 'Natureza Jurídica deve ser uma string' })
  natureza_juridica: string;

  @IsNotEmpty({ message: 'Nome Fantasia é obrigatório' })
  @IsString({ message: 'Nome Fantasia deve ser uma string' })
  nome_fantasia: string;

  @IsOptional() // Se o campo pode ser nulo ou não fornecido
  pais: string;

  @IsNotEmpty({ message: 'Endereço é obrigatório' })
  @IsString({ message: 'Endereço deve ser uma string' })
  endereco: string;

  @IsNotEmpty({ message: 'Data de Início de Atividade é obrigatória' })
  @IsString({ message: 'Data de Início de Atividade deve ser uma string' })
  data_inicio_atividade: string;

  @IsNotEmpty({ message: 'CNAE Fiscal Principal é obrigatório' })
  @IsString({ message: 'CNAE Fiscal Principal deve ser uma string' })
  cnae_fiscal_principal: string;

  @IsOptional() // Se o campo pode ser nulo ou não fornecido
  @IsString({ message: 'CNAE Fiscal Secundário deve ser uma string' })
  cnae_fiscal_secundaria: string;

  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  @IsString({ message: 'Telefone deve ser uma string' })
  telefone: string;

  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'Sócios é obrigatório' })
  @IsString({ message: 'Sócios deve ser uma string' })
  socios: string;
}
