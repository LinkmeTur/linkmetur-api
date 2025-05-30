import { Corporation } from 'src/corporations/entities/corporation.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
export declare class User extends BaseEntity {
    avatar_url: string;
    avatar: Buffer;
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    nivel: number;
    corpId: string;
    corp: Corporation;
}
