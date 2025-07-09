import { IsString } from 'class-validator';

export class CreateCorporationProfileDto {
  @IsString()
  corpID: string;

  @IsString()
  Wallpaper_Url: string;
  @IsString()
  site: string;
  @IsString()
  descricao: string;
  @IsString()
  sobre: string;
  @IsString()
  horario: string;
  @IsString()
  certificacoes: string;
  @IsString()
  redesSociais: string;
}
