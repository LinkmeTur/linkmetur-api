// src/support/support.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SupportService } from './support.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { TicketResponseDto } from './dto/ticket-response.dto';

import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from 'src/authentications/sevices/jwt-guard.guad';
import { CurrentUser } from 'src/authentications/sevices/current-user.decorator';
import { SupportTicket } from './entities/support-ticket.entity';

@ApiTags('Support')
@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post('ticket')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Abrir novo ticket de suporte' })
  @ApiBody({ type: CreateTicketDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: TicketResponseDto })
  async createTicket(
    @Body() dto: CreateTicketDto,
    @CurrentUser() user: User,
  ): Promise<TicketResponseDto> {
    const ticket = await this.supportService.createTicket(dto, user);
    return this.toResponseDto(ticket);
  }

  @Get('tickets')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar meus tickets' })
  async findAll(@CurrentUser() user: User): Promise<TicketResponseDto[]> {
    const tickets = await this.supportService.findAllByUser(user.id);
    return tickets.map((t) => this.toResponseDto(t));
  }

  @Get('ticket/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter ticket com mensagens' })
  @ApiParam({ name: 'id' })
  async findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.supportService.findOne(id, user.id);
  }

  @Post('ticket/:id/message')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Responder ticket' })
  @ApiParam({ name: 'id' })
  async addMessage(
    @Param('id') id: string,
    @Body() dto: CreateMessageDto,
    @CurrentUser() user: User,
  ) {
    return await this.supportService.addMessage(id, dto, user);
  }

  @Put('ticket/:id/close')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fechar ticket' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async close(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.supportService.close(id, user.id);
  }

  private toResponseDto(ticket: SupportTicket): TicketResponseDto {
    return {
      id: ticket.id,
      subject: ticket.subject,
      message: ticket.message,
      status: ticket.status,
      priority: ticket.priority,
      category: ticket.category,
      metadata: ticket.metadata,
      created_at: ticket.created_at,
      updated_at: ticket.updated_at,
    };
  }
}
