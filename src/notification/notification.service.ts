import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Corporation } from 'src/corporations/entities/corporation.entity';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    @InjectRepository(Corporation)
    private readonly corporationRepo: Repository<Corporation>,
  ) {}

  async create(createDto: CreateNotificationDto): Promise<Notification> {
    const user = await this.corporationRepo.findOne({
      where: { id: createDto.corpId },
    });
    if (!user) {
      throw new NotFoundException(
        `Usuário com ID ${createDto.corpId} não encontrado`,
      );
    }

    const notification = this.notificationRepo.create({
      ...createDto,
      lida: createDto.lida ?? false,
    });

    return await this.notificationRepo.save(notification);
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationRepo.find({
      relations: {
        corp: true,
      },
      order: { created_at: 'DESC' },
    });
  }

  async findByUser(corpId: string): Promise<Notification[]> {
    const corp = await this.corporationRepo.findOne({ where: { id: corpId } });
    if (!corp) {
      throw new NotFoundException(`Usuário com ID ${corpId} não encontrado`);
    }

    return this.notificationRepo.find({
      where: { corpId },
      relations: {
        corp: true,
      },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Notification> {
    const notification = await this.notificationRepo.findOne({
      where: { id },
      relations: ['usuario'],
    });
    if (!notification) {
      throw new NotFoundException(`Notificação com ID ${id} não encontrada`);
    }
    return notification;
  }

  async markAsRead(id: string): Promise<Notification> {
    const notification = await this.findOne(id);
    notification.lida = true;
    return this.notificationRepo.save(notification);
  }

  async markAllAsRead(corpId: string): Promise<void> {
    await this.notificationRepo.update({ corpId, lida: false }, { lida: true });
  }

  async countUnread(corpId: string): Promise<number> {
    return this.notificationRepo.count({ where: { corpId, lida: false } });
  }

  async update(
    id: string,
    updateDto: UpdateNotificationDto,
  ): Promise<Notification> {
    const notification = await this.findOne(id);
    Object.assign(notification, updateDto);
    return this.notificationRepo.save(notification);
  }

  async remove(id: string): Promise<void> {
    const notification = await this.findOne(id);
    await this.notificationRepo.remove(notification);
  }
}
