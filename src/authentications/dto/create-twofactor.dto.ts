import { IsString } from 'class-validator';

export class CreateTwoFactorDto {
  @IsString()
  codeFactor: string;
  @IsString()
  data: string;
}
