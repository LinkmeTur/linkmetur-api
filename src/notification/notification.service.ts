// src/notifications/notifications.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationGateway } from './gateway/notification.gateway';
import { MailService } from 'src/mail/mail.service';
import { Corporation } from 'src/corporations/entities/corporation.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    @InjectRepository(Corporation)
    private readonly corpRepo: Repository<Corporation>,
    private readonly wsGateway: NotificationGateway,
    private readonly mailService: MailService,
  ) {}

  /**
   * Cria uma notificação para uma corporation
   */
  async createForCorporation(
    corpId: string,
    titulo: string,
    mensagem: string,
    tipo?: string,
    link?: string,
    metadata?: Record<string, any>,
  ): Promise<Notification> {
    const notification = this.notificationRepo.create({
      corp_id: corpId,
      titulo,
      mensagem,
      tipo,
      link,
      metadata,
    });
    const savedNotification = await this.notificationRepo.save(notification);
    this.wsGateway.notifyCorporation(corpId, savedNotification);
    // Opcional: enviar email para a corporation (se aplicável)
    const corp = await this.corpRepo.findOne({ where: { id: corpId } });
    if (corp?.email) {
      await this.mailService.sendNotificationEmail(corp.email, {
        titulo,
        mensagem,
        link,
      });
    }
    return savedNotification;
  }

  /**
   * Lista todas as notificações de uma corporation
   */
  async findAllByCorporation(
    corpId: string,
    apenasNaoLidas = false,
    tipo?: string,
  ): Promise<Notification[]> {
    const where: { corp_id: string; lida?: boolean; tipo?: string } = {
      corp_id: corpId,
    };
    if (apenasNaoLidas) where.lida = false;
    if (tipo) where.tipo = tipo;

    return await this.notificationRepo.find({
      where,
      order: { created_at: 'DESC' },
    });
  }

  /**
   * Marca uma notificação como lida
   */
  async markAsRead(notificationId: string, corpId: string): Promise<void> {
    const result = await this.notificationRepo.update(
      { id: notificationId, corp_id: corpId },
      { lida: true },
    );

    if (result.affected === 0) {
      throw new Error('Notificação não encontrada ou sem permissão.');
    }
  }

  /**
   * Marca todas como lidas
   */
  async markAllAsRead(corpId: string): Promise<void> {
    await this.notificationRepo.update(
      { corp_id: corpId, lida: false },
      { lida: true },
    );
  }

  /**
   * Conta notificações não lidas
   */
  async countUnread(corpId: string): Promise<number> {
    return await this.notificationRepo.count({
      where: { corp_id: corpId, lida: false },
    });
  }

  /**
   * Busca por ID com validação de acesso
   */
  async findByIdAndCorporation(
    id: string,
    corpId: string,
  ): Promise<Notification> {
    const notification = await this.notificationRepo.findOne({
      where: { id, corp_id: corpId },
    });

    if (!notification) {
      throw new Error('Notificação não encontrada.');
    }

    return notification;
  }
}
