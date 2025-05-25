/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
interface FindHistoryDto {
  remetenteId: string;
  destinatarioId: string;
}

@WebSocketGateway()
export class ChatsGateway {
  constructor(private readonly chatsService: ChatsService) {}

  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto): Promise<any> {
    return this.chatsService.create(createChatDto);
  }

  @SubscribeMessage('findHistory')
  findHistory(@MessageBody() body: FindHistoryDto): Promise<any> {
    const { remetenteId, destinatarioId } = body;
    return this.chatsService.findHistory(remetenteId, destinatarioId);
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
