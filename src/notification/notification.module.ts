import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Corporation } from 'src/corporations/entities/corporation.entity';
import { JwtAuthGuard } from 'src/authentications/sevices/jwt-guard.guad';
import { NotificationsController } from './notification.controller';
import { NotificationsService } from './notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, Corporation])],
  controllers: [NotificationsController],
  providers: [NotificationsService, JwtAuthGuard],
  exports: [NotificationsService, TypeOrmModule],
})
export class NotificationsModule {}
