import { Module } from '@nestjs/common';
import { CorporationProfileService } from './corporation-profile.service';
import { CorporationProfileController } from './corporation-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorporationProfile } from './entities/corporation-profile.entity';
import { JwtAuthGuard } from 'src/authentications/sevices/jwt-guard.guad';

@Module({
  imports: [TypeOrmModule.forFeature([CorporationProfile])],
  controllers: [CorporationProfileController],
  providers: [CorporationProfileService, JwtAuthGuard],
  exports: [TypeOrmModule, CorporationProfileService],
})
export class CorporationProfileModule {}
