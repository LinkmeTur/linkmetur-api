import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobsController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { JobPhotos } from './entities/job_photos.entity';
import { JobEvaluation } from './entities/job_evaluation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job, JobPhotos, JobEvaluation])],
  controllers: [JobsController],
  providers: [JobService],
  exports: [TypeOrmModule, JobService],
})
export class JobModule {}
