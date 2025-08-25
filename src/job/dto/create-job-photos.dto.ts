// dto/create-job-photos.dto.ts
import { IsString, IsUrl, Length } from 'class-validator';

export class CreateJobPhotosDto {
  @IsUrl()
  photo_url: string;

  @IsString()
  @Length(1, 255)
  photo_alt: string;
}
