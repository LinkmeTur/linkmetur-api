import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { ReadChatDTO } from './dto/read-chat.dto';
export declare class ChatsService {
    private readonly chatRepository;
    constructor(chatRepository: Repository<Chat>);
    crypted(message: string): {
        encrypted: Buffer<ArrayBuffer>;
        iv: Buffer<ArrayBufferLike>;
    };
    decryted(message: Buffer, iv: Buffer): string;
    create(createChatDto: CreateChatDto): Promise<Chat>;
    findAll(): string;
    findOne(id: number): string;
    findHistory(remetenteId: string, destinatarioId: string): Promise<(ReadChatDTO | undefined)[]>;
    update(id: number, updateChatDto: UpdateChatDto): string;
    remove(id: number): string;
}
