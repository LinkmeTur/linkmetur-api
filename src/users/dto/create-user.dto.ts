// dto/create-user.dto.ts
import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsInt,
  IsUUID,
  Length,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 100)
  nome: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsString()
  @Length(8, 128, { message: 'A senha deve ter entre 8 e 128 caracteres' })
  senha: string; // será transformada em hash_senha no service

  @IsPhoneNumber('BR', { message: 'Telefone inválido (formato BR)' })
  telefone: string;

  @IsString()
  @IsOptional()
  avatar_url?: string;

  @IsInt({ message: 'Nível deve ser um número inteiro' })
  nivel: number;

  @IsUUID('4', { message: 'corp_id deve ser um UUID válido' })
  corp_id: string;
}
