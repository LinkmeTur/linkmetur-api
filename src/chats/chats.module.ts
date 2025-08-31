import { Module } from '@nestjs/common';
import { ChatService } from './chats.service';
import { ChatGateway } from './gateway/chats.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';

import { CorporationsModule } from 'src/corporations/corporations.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), CorporationsModule],
  providers: [ChatGateway, ChatService],
  exports: [ChatService],
})
export class ChatsModule {}
