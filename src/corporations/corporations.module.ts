import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Corporation } from './entities/corporation.entity';
import { CorporationsService } from './corporations.service';
import { CorporationsController } from './corporations.controller';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    TypeOrmModule.forFeature([Corporation]),
    HttpModule, // Importa o HttpModule
  ],
  controllers: [CorporationsController],
  providers: [CorporationsService],
  exports: [CorporationsService, TypeOrmModule],
})
export class CorporationsModule {}
