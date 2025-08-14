import { IsString, IsUUID } from 'class-validator';

export class CreateChatDto {
  @IsUUID()
  remetenteId: string;
  @IsUUID()
  destinatarioId: string;
  @IsString()
  conteudo: string;
  @IsString()
  remetenteNome: string;
}
