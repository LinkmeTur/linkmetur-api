import { PartialType } from '@nestjs/swagger';
import { CreateRequestForProposalDto } from './create-request-for-proposal.dto';

export class UpdateRequestForProposalDto extends PartialType(CreateRequestForProposalDto) {}
