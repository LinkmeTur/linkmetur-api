// src/support/support.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportTicket } from './entities/support-ticket.entity';
import { SupportMessage } from './entities/support-message.entity';
import { SupportController } from './support.controller';
import { SupportService } from './support.service';
import { NotificationsModule } from 'src/notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupportTicket, SupportMessage]),
    NotificationsModule,
  ],
  controllers: [SupportController],
  providers: [SupportService],
  exports: [SupportService],
})
export class SupportModule {}
