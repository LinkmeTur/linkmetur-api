// src/auth/dto/update-authentication.dto.ts
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateAuthenticationDto {
  @IsOptional()
  @IsString()
  @MinLength(6)
  senha?: string;

  @IsOptional()
  token_recuperacao?: string;

  @IsOptional()
  expiracao_token?: Date;

  @IsOptional()
  email_verificado?: boolean;

  @IsOptional()
  codigo_2fa?: string;

  @IsOptional()
  dois_fatores_ativo?: boolean;
}
