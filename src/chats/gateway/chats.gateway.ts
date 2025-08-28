/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/chat/gateway/chat.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { CreateChatDto } from '../dto/create-chat.dto';
import { ChatResponseDto } from '../dto/chat-response.dto';
import { ChatService } from '../chats.service';
import { WsJwtGuard } from '../guards/ws-jwt.guard';
import { CurrentUser } from 'src/authentications/sevices/current-user.decorator';
import { Chat } from '../entities/chat.entity';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', process.env.FRONTEND_URL].filter(Boolean),
    credentials: true,
  },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Mapa de usuários conectados: userId → socketId
  private userSockets = new Map<string, string>();

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: Socket) {
    const user = client.data.user as User;
    if (user) {
      this.userSockets.set(user.id, client.id);
      await client.join(`user_${user.id}`);
      this.server.emit('userStatus', { userId: user.id, status: 'online' });
    }
  }

  async handleDisconnect(client: Socket) {
    const user = client.data.user as User;
    if (user) {
      this.userSockets.delete(user.id);
      await client.leave(`user_${user.id}`);
      this.server.emit('userStatus', { userId: user.id, status: 'offline' });
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() createDto: CreateChatDto,
    @CurrentUser() user: User,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const message = await this.chatService.sendMessage(createDto, user);

      const response = this.toResponseDto(message);

      // Envia para o destinatário
      const destinatarioSockets = this.server.sockets.adapter.rooms.get(
        `user_${message.destinatario_id}`,
      );
      if (destinatarioSockets) {
        for (const socketId of destinatarioSockets) {
          this.server.to(socketId).emit('newMessage', response);
        }
      }

      // Confirma ao remetente
      client.emit('messageSent', response);

      // Notificação
      this.server.to(`user_${message.destinatario_id}`).emit('notification', {
        type: 'new_message',
        senderId: user.id,
        senderName: user.nome,
        message: message.conteudo?.substring(0, 50) || '[Foto]',
        timestamp: new Date(),
        context: {
          request_id: message.request_id,
          rfp_id: message.rfp_id,
          job_id: message.job_id,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        client.emit('error', { message: error.message });
      }
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('joinConversation')
  async handleJoin(
    @CurrentUser() user: User,
    @MessageBody('contextId') contextId: string,
    @MessageBody('contextType') contextType: 'request' | 'rfp' | 'job',
    @ConnectedSocket() client: Socket,
  ) {
    const room = `conversation_${contextType}_${contextId}`;
    await client.join(room);
    client.data.room = room;
    client.emit('joined', { room, contextId, contextType });
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('leaveConversation')
  async handleLeave(@ConnectedSocket() client: Socket) {
    if (client.data.room) {
      await client.leave(client.data.room);
      client.data.room = null;
    }
  }

  private toResponseDto(chat: Chat): ChatResponseDto {
    return {
      id: chat.id,
      remetente_id: chat.remetente_id,
      destinatario_id: chat.destinatario_id,
      request_id: chat.request_id,
      rfp_id: chat.rfp_id,
      job_id: chat.job_id,
      conteudo: chat.conteudo,
      photo_url: chat.photo_url,
      photo_alt: chat.photo_alt,
      iv: chat.iv?.toString('base64'),
      lida: chat.lida,
      created_at: chat.created_at,
      updated_at: chat.updated_at,
    };
  }
}
