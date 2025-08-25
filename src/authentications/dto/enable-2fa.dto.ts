// src/auth/dto/enable-2fa.dto.ts
import { IsBoolean } from 'class-validator';

export class Enable2FADto {
  @IsBoolean()
  ativar: boolean;
}
