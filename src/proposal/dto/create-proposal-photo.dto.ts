// src/proposal/dto/create-proposal-photo.dto.ts
import { IsString, IsUrl, Length } from 'class-validator';

export class CreateProposalPhotoDto {
  @IsUrl({}, { message: 'photo_url deve ser uma URL válida' })
  photo_url: string;

  @IsString()
  @Length(1, 255)
  photo_alt: string;
}
