import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateAuthenticationDto {
  @IsEmail({}, { message: 'Email deve ser válido.' })
  @IsNotEmpty({ message: 'Email é obrigatório.' })
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Senha é obrigatória.' })
  @Length(6, 100, { message: 'A senha deve ter entre 6 e 100 caracteres.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'A senha deve conter letras maiúsculas, minúsculas e números.',
  })
  password: string;
}
