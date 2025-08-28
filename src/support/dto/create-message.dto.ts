// src/support/dto/create-message.dto.ts
import { IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  message: string;

  @IsUrl()
  @IsOptional()
  attachment_url?: string;
}
