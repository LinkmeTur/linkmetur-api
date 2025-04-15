import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TourismEnterpriseProfilesModule } from './tourism-enterprise-profiles/tourism-enterprise-profiles.module';
import { ServiceSupplierProfilesModule } from './service-supplier-profiles/service-supplier-profiles.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [],
      synchronize: true,
    }),
    UsersModule,
    TourismEnterpriseProfilesModule,
    ServiceSupplierProfilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
