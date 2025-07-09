import { IsBoolean, IsEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsEmpty()
  corporationID: string;

  @IsString()
  @IsEmpty()
  contactID: string;

  @IsBoolean()
  @IsOptional()
  blocked_contact: boolean;

  @IsBoolean()
  @IsOptional()
  saved_contact: boolean;

  @IsBoolean()
  @IsOptional()
  favorited_contact: boolean;
}
