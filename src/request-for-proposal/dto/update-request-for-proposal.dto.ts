import { PartialType } from '@nestjs/swagger';
import { CreateRfpDto } from './create-request-for-proposal.dto';

export class UpdateRequestForProposalDto extends PartialType(CreateRfpDto) {}
