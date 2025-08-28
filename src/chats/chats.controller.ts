// src/chat/chat.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { CreateChatDto } from './dto/create-chat.dto';
import { ChatResponseDto } from './dto/chat-response.dto';

import { User } from '../users/entities/user.entity';
import { ChatService } from './chats.service';
import { JwtAuthGuard } from 'src/authentications/sevices/jwt-guard.guad';
import { CurrentUser } from 'src/authentications/sevices/current-user.decorator';
import { Chat } from './entities/chat.entity';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enviar mensagem para outro usuário' })
  @ApiBody({ type: CreateChatDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: ChatResponseDto })
  async sendMessage(
    @Body() dto: CreateChatDto,
    @CurrentUser() user: User,
  ): Promise<ChatResponseDto> {
    const message = await this.chatService.sendMessage(dto, user);
    return this.toResponseDto(message);
  }

  @Get('with/:otherId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter conversa com um usuário em um contexto' })
  @ApiParam({ name: 'otherId', description: 'ID do outro usuário' })
  @ApiQuery({ name: 'contextId', description: 'ID do request, rfp ou job' })
  @ApiQuery({ name: 'contextType', enum: ['request', 'rfp', 'job'] })
  async getConversation(
    @Param('otherId') otherId: string,
    @Query('contextId') contextId: string,
    @Query('contextType') contextType: 'request' | 'rfp' | 'job',
    @CurrentUser() user: User,
  ): Promise<ChatResponseDto[]> {
    const messages = await this.chatService.getConversationWith(
      otherId,
      contextId,
      contextType,
      user,
    );

    // Marca como lido
    await this.chatService.markAsRead(otherId, user);

    return messages.map((m) => this.toResponseDto(m));
  }

  @Get('unread-count')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Contar mensagens não lidas' })
  async getUnreadCount(@CurrentUser() user: User): Promise<{ count: number }> {
    const count = await this.chatService.getUnreadCount(user.id);
    return { count };
  }

  @Get('conversations')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listar conversas ativas (com último msg e não lidas)',
  })
  async getConversations(@CurrentUser() user: User) {
    const conversations = await this.chatService.getActiveConversations(user);
    return conversations.map((conv) => ({
      usuario_id: conv.userId,
      ultima_mensagem: conv.lastMessage,
      timestamp: conv.timestamp,
      contexto: conv.context,
      nao_lidas: conv.unreadCount,
    }));
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
      iv: chat.iv?.toString('base64'),
      lida: chat.lida,
      photo_url: chat.photo_url,
      photo_alt: chat.photo_alt,
      created_at: chat.created_at,
      updated_at: chat.updated_at,
    };
  }
}
