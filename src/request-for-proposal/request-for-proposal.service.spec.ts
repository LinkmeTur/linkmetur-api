import { Test, TestingModule } from '@nestjs/testing';
import { RequestForProposalService } from './request-for-proposal.service';

describe('RequestForProposalService', () => {
  let service: RequestForProposalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestForProposalService],
    }).compile();

    service = module.get<RequestForProposalService>(RequestForProposalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
