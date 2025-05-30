import { Corporation } from 'src/corporations/entities/corporation.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
export declare class Chat extends BaseEntity {
    remetenteID: string;
    remetenteNome: string;
    destinatarioID: string;
    conteudo: Buffer;
    iv: Buffer;
    remetente: Corporation;
    destinatario: Corporation;
}
