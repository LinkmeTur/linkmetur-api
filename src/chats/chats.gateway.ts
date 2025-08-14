import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server, Socket } from 'socket.io';
interface FindHistoryDto {
  remetenteId: string;
  destinatarioId: string;
}

@WebSocketGateway({ namespace: '/chat', cors: true })
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(private readonly chatsService: ChatsService) {
    console.log('✅ ChatsGateway carregado');
  }

  async handleConnection(client: Socket) {
    const { remetenteId, destinatarioId } = client.handshake.query;
    console.log('Conexão recebida:', remetenteId, destinatarioId);

    if (!remetenteId || !destinatarioId) {
      console.warn('IDs ausentes na conexão');
      return client.disconnect();
    }

    try {
      const historico = await this.chatsService.findHistory(
        remetenteId as string,
        destinatarioId as string,
      );
      client.emit(
        `historico_${remetenteId as string}_${destinatarioId as string}`,
        historico,
      );
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    // Aqui você pode limpar sessões, logs, etc.
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('novaMensagem')
  async create(@MessageBody() createChatDto: string): Promise<any> {
    console.log('passo 1', createChatDto);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: CreateChatDto = JSON.parse(createChatDto);
    console.log('passo 2', data);
    const mensagem = await this.chatsService.create(data);
    console.log('passo 2.1', mensagem);
    this.server.emit(
      'mensagem_' + data.destinatarioId.toString(),
      mensagem.conteudo,
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
