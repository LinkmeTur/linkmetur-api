// src/request-for-proposal/dto/request-photo-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class RequestPhotoResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: false })
  photo_URL: string;

  @ApiProperty({ required: false })
  photo_alt: string;

  @ApiProperty()
  created_at: Date;
}
