import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobsController } from './job.controller';

@Module({
  controllers: [JobsController],
  providers: [JobService],
})
export class JobModule {}
