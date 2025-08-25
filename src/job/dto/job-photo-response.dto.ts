// src/jobs/dto/job-photo-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class JobPhotoResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  photo_url: string;

  @ApiProperty()
  photo_alt: string;

  @ApiProperty()
  created_at: Date;
}
