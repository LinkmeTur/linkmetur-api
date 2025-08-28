// src/support/support.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportTicket } from './entities/support-ticket.entity';
import { SupportMessage } from './entities/support-message.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from '../users/entities/user.entity';
import { NotificationsService } from 'src/notification/notification.service';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(SupportTicket)
    private readonly ticketRepo: Repository<SupportTicket>,
    @InjectRepository(SupportMessage)
    private readonly messageRepo: Repository<SupportMessage>,
    private readonly notificationsService: NotificationsService,
  ) {}

  /**
   * Abre um novo ticket de suporte
   */
  async createTicket(dto: CreateTicketDto, user: User): Promise<SupportTicket> {
    const ticket = this.ticketRepo.create({
      ...dto,
      user_id: user.id,
      corp_id: user.corp_id,
      status: 'aberto',
    });

    const saved = await this.ticketRepo.save(ticket);

    // Notifica equipe de suporte
    await this.notificationsService.createForCorporation(
      'SUPORTE_CORP_ID', // ID da equipe de suporte
      'Novo Ticket de Suporte',
      `Novo ticket aberto: ${dto.subject}`,
      'suporte',
      `/admin/support/${saved.id}`,
      { ticket_id: saved.id, user_id: user.id },
    );

    return saved;
  }

  /**
   * Lista tickets do usuário ou da corporation
   */
  async findAllByUser(userId: string): Promise<SupportTicket[]> {
    return await this.ticketRepo.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });
  }

  /**
   * Busca um ticket com mensagens
   */
  async findOne(id: string, userId: string): Promise<SupportTicket> {
    const ticket = await this.ticketRepo.findOne({
      where: { id },
      relations: ['messages', 'messages.user'],
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket não encontrado.`);
    }

    if (ticket.user_id !== userId) {
      throw new ForbiddenException('Acesso negado.');
    }

    return ticket;
  }

  /**
   * Adiciona uma mensagem ao ticket
   */
  async addMessage(
    ticketId: string,
    dto: CreateMessageDto,
    user: User,
  ): Promise<SupportMessage> {
    const ticket = await this.ticketRepo.findOne({ where: { id: ticketId } });
    if (!ticket) {
      throw new NotFoundException(`Ticket não encontrado.`);
    }

    if (ticket.user_id !== user.id) {
      throw new ForbiddenException('Apenas o criador pode responder.');
    }

    const message = this.messageRepo.create({
      ticket_id: ticketId,
      user_id: user.id,
      ...dto,
    });

    const saved = await this.messageRepo.save(message);

    // Atualiza status
    ticket.status = 'em andamento';
    await this.ticketRepo.save(ticket);

    // Notifica equipe
    await this.notificationsService.createForCorporation(
      'SUPORTE_CORP_ID',
      'Resposta no Ticket',
      `O usuário respondeu ao ticket: ${ticket.subject}`,
      'suporte',
      `/admin/support/${ticketId}`,
    );

    return saved;
  }

  /**
   * Fecha um ticket
   */
  async close(ticketId: string, userId: string): Promise<void> {
    const ticket = await this.ticketRepo.findOne({ where: { id: ticketId } });
    if (!ticket || ticket.user_id !== userId) {
      throw new ForbiddenException('Acesso negado.');
    }

    ticket.status = 'fechado';
    await this.ticketRepo.save(ticket);
  }
}
