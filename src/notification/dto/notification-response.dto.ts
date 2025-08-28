// src/notifications/dto/notification-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class NotificationResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  titulo: string;

  @ApiProperty()
  mensagem: string;

  @ApiProperty()
  lida: boolean;

  @ApiProperty({ required: false })
  tipo: string;

  @ApiProperty({ required: false })
  link: string;

  @ApiProperty({ required: false })
  metadata: Record<string, any>;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
