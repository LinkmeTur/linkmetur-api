import { Test, TestingModule } from '@nestjs/testing';
import { TourismEnterpriseProfilesService } from './tourism-enterprise-profiles.service';

describe('TourismEnterpriseProfilesService', () => {
  let service: TourismEnterpriseProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TourismEnterpriseProfilesService],
    }).compile();

    service = module.get<TourismEnterpriseProfilesService>(TourismEnterpriseProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
