// src/auth/dto/signup.dto.ts
import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class SignupDto extends OmitType(CreateUserDto, ['nivel'] as const) {
  // nivel será definido por padrão (ex: 1)
}
