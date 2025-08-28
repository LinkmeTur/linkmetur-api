// src/chat/dto/chat-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class ChatResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  remetente_id: string;

  @ApiProperty()
  destinatario_id: string;

  @ApiProperty({ required: false })
  request_id: string;

  @ApiProperty({ required: false })
  rfp_id: string;

  @ApiProperty({ required: false })
  job_id: string;

  @ApiProperty({ required: false })
  conteudo: string;

  @ApiProperty({ required: false })
  photo_url: string;

  @ApiProperty({ required: false })
  photo_alt: string;

  @ApiProperty({ required: false })
  iv: string;

  @ApiProperty()
  lida: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
