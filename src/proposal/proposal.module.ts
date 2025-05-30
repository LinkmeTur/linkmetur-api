import { Module } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { ProposalController } from './proposal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposal } from './entities/proposal.entity';
import { ProposalPhotos } from './entities/proposal-photos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proposal, ProposalPhotos])],
  controllers: [ProposalController],
  providers: [ProposalService],
  exports: [TypeOrmModule, ProposalService],
})
export class ProposalModule {}
