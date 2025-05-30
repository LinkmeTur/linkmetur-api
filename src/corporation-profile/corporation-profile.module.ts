import { Module } from '@nestjs/common';
import { CorporationProfileService } from './corporation-profile.service';
import { CorporationProfileController } from './corporation-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorporationProfile } from './entities/corporation-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CorporationProfile])],
  controllers: [CorporationProfileController],
  providers: [CorporationProfileService],
  exports: [TypeOrmModule, CorporationProfileService],
})
export class CorporationProfileModule {}
