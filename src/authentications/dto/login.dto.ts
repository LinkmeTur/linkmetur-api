// src/auth/dto/login.dto.ts
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsString()
  @Length(6, 128)
  senha: string;
}
