import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server } from 'socket.io';
interface FindHistoryDto {
    remetenteId: string;
    destinatarioId: string;
}
export declare class ChatsGateway {
    private readonly chatsService;
    server: Server;
    constructor(chatsService: ChatsService);
    create(createChatDto: CreateChatDto): Promise<any>;
    findHistory(body: FindHistoryDto): Promise<any>;
    update(updateChatDto: UpdateChatDto): string;
    remove(body: {
        id: number;
    }): string;
}
export {};
