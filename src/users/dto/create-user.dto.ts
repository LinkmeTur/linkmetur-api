/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
