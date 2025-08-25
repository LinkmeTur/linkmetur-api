import { Module } from '@nestjs/common';
import { AuthenticationsService } from './authentications.service';
import { AuthenticationsController } from './authentications.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
// import { JwtStrategy } from './sevices/JwtSrategy.service';
import { CorporationsModule } from 'src/corporations/corporations.module';
import { HttpModule } from '@nestjs/axios';
import { JwtAuthGuard } from './sevices/jwt-guard.guad';
import { JwtStrategy } from './strategies/JwtStrategy.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
    }),
    HttpModule,
    UsersModule,
    CorporationsModule,
  ],
  controllers: [AuthenticationsController],
  providers: [AuthenticationsService, JwtAuthGuard, JwtStrategy],
  exports: [AuthenticationsService],
})
export class AuthenticationsModule {}
