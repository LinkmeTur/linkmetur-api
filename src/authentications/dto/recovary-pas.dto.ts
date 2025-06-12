import { IsString } from 'class-validator';

export class RecoveryDto {
  @IsString()
  email: string;
}
