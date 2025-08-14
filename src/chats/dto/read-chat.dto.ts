import { Corporation } from 'src/corporations/entities/corporation.entity';

export type ReadChatDTO = {
  conteudo: string;
  remetenteId: string;
  remetenteNome: string;
  destinatarioId: string;
  remetente: Corporation;
  destinatario: Corporation;
  id: string;
  created_at: Date;
  updated_at: Date;
};
