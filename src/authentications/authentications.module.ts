import { Module } from '@nestjs/common';
import { AuthenticationsService } from './authentications.service';
import { AuthenticationsController } from './authentications.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './sevices/JwtSrategy.service';
import { CorporationsModule } from 'src/corporations/corporations.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
    }),
    UsersModule,
    CorporationsModule,
  ],
  controllers: [AuthenticationsController],
  providers: [AuthenticationsService, JwtStrategy],
  exports: [AuthenticationsService],
})
export class AuthenticationsModule {}
