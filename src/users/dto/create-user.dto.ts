/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsInt,
  Min,
  Max,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../types/enuns/user-role.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  senha: string;

  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  @IsString()
  @MinLength(10, { message: 'O telefone deve conter no minimo 10 digitos' })
  @MaxLength(13, { message: 'O telefone deve conter no maximo 13 digitos' })
  telefone: string;

  @IsNotEmpty({ message: 'Nível é obrigatório' })
  @IsInt({ message: 'Nível deve ser um número inteiro' })
  @Min(1, { message: 'Nível deve ser pelo menos 1' })
  @Max(3, { message: 'Nível deve ser no máximo 3' })
  @IsEnum(UserRole, {
    message:
      'Nível deve ser um dos seguintes: 1 (Admin), 2 (Funcionário), 3 (Visitante)',
  })
  @Transform(({ value }) => Number(value)) // Transformação personalizada para número
  nivel: number; // Mantenha como number
  @IsNotEmpty()
  corpId: string;
}
