// src/notification/dto/create-notification.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  mensagem: string;

  @IsOptional()
  @IsBoolean()
  lida?: boolean;

  @IsString()
  @IsNotEmpty()
  corpId: string;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  metadata?: any;
}
