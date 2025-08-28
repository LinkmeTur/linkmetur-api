/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/notifications/gateway/notification.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { User } from '../../users/entities/user.entity';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', process.env.FRONTEND_URL].filter(Boolean),
    credentials: true,
  },
  namespace: '/notifications',
})
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  // userId → socketId
  private userSockets = new Map<string, string>();

  async handleConnection(client: Socket) {
    const user = client.data.user as User;
    if (user) {
      this.userSockets.set(user.id, client.id);
      await client.join(`user_${user.id}`);
      await client.join(`corp_${user.corp_id}`);
    }
  }

  async handleDisconnect(client: Socket) {
    const user = client.data.user as User;
    if (user) {
      this.userSockets.delete(user.id);
      await client.leave(`user_${user.id}`);
      await client.leave(`corp_${user.corp_id}`);
    }
  }

  /**
   * Envia notificação em tempo real para uma corporation
   */
  notifyCorporation(corpId: string, notification: any) {
    this.server.to(`corp_${corpId}`).emit('notification', notification);
  }

  /**
   * Envia notificação direta para um usuário
   */
  notifyUser(userId: string, notification: any) {
    this.server.to(`user_${userId}`).emit('notification', notification);
  }
}
