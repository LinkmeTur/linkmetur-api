import { IsString, IsUUID } from 'class-validator';

export class CreateChatDto {
  @IsUUID()
  remetenteID: string;
  @IsUUID()
  destinatarioID: string;
  @IsString()
  conteudo: string;
  @IsString()
  remetenteNome: string;
}
