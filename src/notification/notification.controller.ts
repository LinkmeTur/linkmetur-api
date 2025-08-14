import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from 'src/authentications/sevices/jwt-guard.guad';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Criar uma nova notificação' })
  @ApiBody({ type: CreateNotificationDto })
  @ApiResponse({ status: 201, description: 'Notificação criada com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  create(@Body() createDto: CreateNotificationDto) {
    return this.notificationService.create(createDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar todas as notificações' })
  @ApiResponse({ status: 200, description: 'Lista de notificações' })
  findAll() {
    return this.notificationService.findAll();
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar notificações de um usuário' })
  @ApiResponse({ status: 200, description: 'Lista de notificações do usuário' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  findByUser(@Param('userId') userId: string) {
    return this.notificationService.findByUser(userId);
  }

  @Get('user/:userId/unread/count')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Contar notificações não lidas de um usuário' })
  @ApiResponse({ status: 200, description: 'Número de notificações não lidas' })
  countUnread(@Param('userId') userId: string) {
    return this.notificationService.countUnread(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obter notificação por ID' })
  @ApiResponse({ status: 200, description: 'Notificação encontrada' })
  @ApiResponse({ status: 404, description: 'Notificação não encontrada' })
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(id);
  }

  @Patch(':id/read')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Marcar notificação como lida' })
  @ApiResponse({ status: 200, description: 'Notificação marcada como lida' })
  markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id);
  }

  @Patch('user/:userId/read-all')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Marcar todas as notificações de um usuário como lidas',
  })
  @ApiResponse({
    status: 200,
    description: 'Todas as notificações marcadas como lidas',
  })
  markAllAsRead(@Param('userId') userId: string) {
    return this.notificationService.markAllAsRead(userId);
  }

  @Patch(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar notificação' })
  @ApiResponse({ status: 200, description: 'Notificação atualizada' })
  update(@Param('id') id: string, @Body() updateDto: UpdateNotificationDto) {
    return this.notificationService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remover notificação' })
  @ApiResponse({ status: 204, description: 'Notificação removida' })
  remove(@Param('id') id: string) {
    void this.notificationService.remove(id);
    return;
  }
}
