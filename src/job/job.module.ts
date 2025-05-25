import { Module } from '@nestjs/common';
import { ServicesService } from './job.service';
import { ServicesController } from './job.controller';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
