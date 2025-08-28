// src/chat/dto/create-chat.dto.ts
import { IsString, IsUUID, IsOptional, IsUrl } from 'class-validator';

export class CreateChatDto {
  @IsString()
  @IsUUID()
  destinatario_id: string;

  @IsString()
  @IsUUID()
  remetente_id: string;

  @IsString()
  @IsOptional()
  conteudo?: string;

  @IsUrl()
  @IsOptional()
  photo_url?: string;

  @IsString()
  @IsOptional()
  photo_alt?: string;

  @IsOptional()
  @IsUUID()
  request_id?: string;

  @IsOptional()
  @IsUUID()
  rfp_id?: string;

  @IsOptional()
  @IsUUID()
  job_id?: string;

  @IsOptional()
  @IsString()
  iv?: string;
}
