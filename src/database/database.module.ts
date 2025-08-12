import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/chats/entities/chat.entity';
import { Contact } from 'src/contacts/entities/contact.entity';
import { CorporationProfile } from 'src/corporation-profile/entities/corporation-profile.entity';
import { Corporation } from 'src/corporations/entities/corporation.entity';
import { Job } from 'src/job/entities/job.entity';
import { JobEvaluation } from 'src/job/entities/job_evaluation.entity';
import { JobPhotos } from 'src/job/entities/job_photos.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { ProposalPhotos } from 'src/proposal/entities/proposal-photos.entity';
import { Proposal } from 'src/proposal/entities/proposal.entity';
import { RequestForProposal } from 'src/request-for-proposal/entities/request-for-proposal.entity';
import { RequestPhotos } from 'src/request-for-proposal/entities/request-photos.entity';
import { Request } from 'src/request/entities/request.entity';
import { User } from 'src/users/entities/user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Corporation,
      CorporationProfile,
      User,
      Job,
      JobPhotos,
      JobEvaluation,
      RequestForProposal,
      RequestPhotos,
      Proposal,
      ProposalPhotos,
      Request,
      Contact,
      Chat,
      Notification,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
