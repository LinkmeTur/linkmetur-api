// src/notifications/notifications.controller.ts
import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { NotificationResponseDto } from './dto/notification-response.dto';

import { User } from '../users/entities/user.entity';
import { Notification } from './entities/notification.entity';
import { NotificationsService } from './notification.service';
import { JwtAuthGuard } from 'src/authentications/sevices/jwt-guard.guad';
import { CurrentUser } from 'src/authentications/sevices/current-user.decorator';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar notificações da corporation' })
  @ApiQuery({ name: 'naoLidas', required: false, type: Boolean })
  @ApiQuery({ name: 'tipo', required: false, type: String })
  @ApiResponse({ status: HttpStatus.OK, type: [NotificationResponseDto] })
  async findAll(
    @Query('naoLidas') naoLidas: string,
    @Query('tipo') tipo: string,
    @CurrentUser() user: User,
  ): Promise<NotificationResponseDto[]> {
    const notifications = await this.notificationsService.findAllByCorporation(
      user.corp_id,
      !!naoLidas,
      tipo,
    );
    return notifications.map((n) => this.toResponseDto(n));
  }

  @Get('count')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Contar notificações não lidas' })
  @ApiResponse({ status: HttpStatus.OK, schema: { example: { count: 3 } } })
  async countUnread(@CurrentUser() user: User): Promise<{ count: number }> {
    const count = await this.notificationsService.countUnread(user.corp_id);
    return { count };
  }

  @Patch(':id/read')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Marcar notificação como lida' })
  @ApiParam({ name: 'id', description: 'ID da notificação' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async markAsRead(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<void> {
    return await this.notificationsService.markAsRead(id, user.corp_id);
  }

  @Patch('mark-all-read')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Marcar todas as notificações como lidas' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async markAllAsRead(@CurrentUser() user: User): Promise<void> {
    return await this.notificationsService.markAllAsRead(user.corp_id);
  }

  private toResponseDto(notification: Notification): NotificationResponseDto {
    return {
      id: notification.id,
      titulo: notification.titulo,
      mensagem: notification.mensagem,
      lida: notification.lida,
      tipo: notification.tipo,
      link: notification.link,
      metadata: notification.metadata,
      created_at: notification.created_at,
      updated_at: notification.updated_at,
    };
  }
}
