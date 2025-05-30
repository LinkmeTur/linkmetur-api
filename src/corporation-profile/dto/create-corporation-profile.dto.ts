import { IsString } from 'class-validator';

export class CreateCorporationProfileDto {
  @IsString()
  corpID: string;
  @IsString()
  descricao: string;
}
