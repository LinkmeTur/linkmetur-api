import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';

import { Corporation } from 'src/corporations/entities/corporation.entity';
import { NotificationController } from './notification.controller';
import { JwtAuthGuard } from 'src/authentications/sevices/jwt-guard.guad';
import { NotificationService } from './notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, Corporation])],
  controllers: [NotificationController],
  providers: [NotificationService, JwtAuthGuard],
  exports: [NotificationService, TypeOrmModule],
})
export class NotificationModule {}
