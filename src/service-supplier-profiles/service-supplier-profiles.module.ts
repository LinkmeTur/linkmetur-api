import { Module } from '@nestjs/common';
import { ServiceSupplierProfilesService } from './service-supplier-profiles.service';
import { ServiceSupplierProfilesController } from './service-supplier-profiles.controller';

@Module({
  controllers: [ServiceSupplierProfilesController],
  providers: [ServiceSupplierProfilesService],
})
export class ServiceSupplierProfilesModule {}
