import { Test, TestingModule } from '@nestjs/testing';
import { CorporationProfileService } from './corporation-profile.service';

describe('CorporationProfileService', () => {
  let service: CorporationProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorporationProfileService],
    }).compile();

    service = module.get<CorporationProfileService>(CorporationProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
