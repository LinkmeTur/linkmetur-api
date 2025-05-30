import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CorporationsModule } from './corporations/corporations.module';
import { AuthenticationsModule } from './authentications/authentications.module';
import { ChatsModule } from './chats/chats.module';
import { JobModule } from './job/job.module';
import { ContactsModule } from './contacts/contacts.module';
import { RequestForProposalModule } from './request-for-proposal/request-for-proposal.module';
import { ProposalModule } from './proposal/proposal.module';
import { CorporationProfileModule } from './corporation-profile/corporation-profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      dropSchema: false,
      retryAttempts: 2,
      retryDelay: 100,
    }),

    UsersModule,

    CorporationsModule,

    AuthenticationsModule,

    JobModule,

    ChatsModule,

    ContactsModule,

    RequestForProposalModule,

    ProposalModule,

    CorporationProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
