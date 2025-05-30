/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server } from 'socket.io';
interface FindHistoryDto {
  remetenteId: string;
  destinatarioId: string;
}

@WebSocketGateway({ cors: true })
export class ChatsGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly chatsService: ChatsService) {}

  @SubscribeMessage('novaMensagen')
  async create(@MessageBody() createChatDto: CreateChatDto): Promise<any> {
    const mensagem = await this.chatsService.create(createChatDto);
    this.server.emit(
      'mensagem_' + createChatDto.destinatarioID.toString(),
      mensagem,
    );
  }

  @SubscribeMessage('findHistory')
  async findHistory(@MessageBody() body: FindHistoryDto): Promise<any> {
    const { remetenteId, destinatarioId } = body;
    const historico = await this.chatsService.findHistory(
      remetenteId,
      destinatarioId,
    );
    this.server.emit(
      `historico_${body.remetenteId}_${body.destinatarioId}`,
      historico,
    );
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() body: { id: number }) {
    return this.chatsService.remove(body.id);
  }
}
