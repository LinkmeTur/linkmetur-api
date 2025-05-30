import { Module } from '@nestjs/common';
import { RequestForProposalService } from './request-for-proposal.service';
import { RequestForProposalController } from './request-for-proposal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestForProposal } from './entities/request-for-proposal.entity';
import { RequestPhotos } from './entities/request-photos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestForProposal, RequestPhotos])],
  controllers: [RequestForProposalController],
  providers: [RequestForProposalService],
  exports: [TypeOrmModule, RequestForProposalService],
})
export class RequestForProposalModule {}
