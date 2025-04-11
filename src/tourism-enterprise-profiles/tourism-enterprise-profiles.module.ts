import { Module } from '@nestjs/common';
import { TourismEnterpriseProfilesService } from './tourism-enterprise-profiles.service';
import { TourismEnterpriseProfilesController } from './tourism-enterprise-profiles.controller';

@Module({
  controllers: [TourismEnterpriseProfilesController],
  providers: [TourismEnterpriseProfilesService],
})
export class TourismEnterpriseProfilesModule {}
