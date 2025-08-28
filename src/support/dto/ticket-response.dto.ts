// src/support/dto/ticket-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class TicketResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  priority: string;

  @ApiProperty()
  category: string;

  @ApiProperty({ required: false })
  metadata: Record<string, any>;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
