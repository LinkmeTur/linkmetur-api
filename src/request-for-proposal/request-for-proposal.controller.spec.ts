import { Test, TestingModule } from '@nestjs/testing';
import { RequestForProposalController } from './request-for-proposal.controller';
import { RequestForProposalService } from './request-for-proposal.service';

describe('RequestForProposalController', () => {
  let controller: RequestForProposalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestForProposalController],
      providers: [RequestForProposalService],
    }).compile();

    controller = module.get<RequestForProposalController>(RequestForProposalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
