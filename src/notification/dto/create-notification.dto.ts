// src/notifications/dto/create-notification.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  titulo: string;

  @IsString()
  mensagem: string;

  @IsString()
  @IsOptional()
  tipo?: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsOptional()
  metadata?: Record<string, any>;
}
