import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsGateway } from './chats.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';

import { CorporationsModule } from 'src/corporations/corporations.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), CorporationsModule],
  providers: [ChatsGateway, ChatsService],
})
export class ChatsModule {}
