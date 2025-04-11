import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TourismEnterpriseProfilesModule } from './tourism-enterprise-profiles/tourism-enterprise-profiles.module';
import { ServiceSupplierProfilesModule } from './service-supplier-profiles/service-supplier-profiles.module';

@Module({
  imports: [
    UsersModule,
    TourismEnterpriseProfilesModule,
    ServiceSupplierProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
