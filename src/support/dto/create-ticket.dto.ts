// src/support/dto/create-ticket.dto.ts
import { IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  subject: string;

  @IsString()
  message: string;

  @IsEnum(['baixa', 'média', 'alta', 'urgente'])
  priority: string;

  @IsEnum(['técnico', 'faturamento', 'funcionalidade', 'feedback'])
  category: string;

  @IsOptional()
  metadata?: Record<string, any>;
}
