import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class RecoveryDto {
  @IsEmail({}, { message: 'Email deve ser válido.' })
  @IsNotEmpty({ message: 'Email é obrigatório.' })
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  email: string;
}
