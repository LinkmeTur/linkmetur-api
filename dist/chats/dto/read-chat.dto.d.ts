import { Corporation } from 'src/corporations/entities/corporation.entity';
export type ReadChatDTO = {
    conteudo: string;
    remetenteID: string;
    remetenteNome: string;
    destinatarioID: string;
    remetente: Corporation;
    destinatario: Corporation;
    id: string;
    created_at: Date;
    updated_at: Date;
};
