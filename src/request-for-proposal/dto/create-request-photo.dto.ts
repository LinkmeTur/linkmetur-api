// src/request-for-proposal/dto/create-request-photo.dto.ts
import { IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateRequestPhotoDto {
  @IsUrl({}, { message: 'photo_URL deve ser uma URL válida' })
  @IsOptional()
  photo_URL?: string;

  @IsString()
  @IsOptional()
  photo_alt?: string;
}
