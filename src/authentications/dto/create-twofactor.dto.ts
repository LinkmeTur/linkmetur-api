import { IsString } from 'class-validator';

export class CreateTwoFactorDto {
  @IsString()
  data: string;
}
