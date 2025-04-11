import { Test, TestingModule } from '@nestjs/testing';
import { TourismEnterpriseProfilesController } from './tourism-enterprise-profiles.controller';
import { TourismEnterpriseProfilesService } from './tourism-enterprise-profiles.service';

describe('TourismEnterpriseProfilesController', () => {
  let controller: TourismEnterpriseProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TourismEnterpriseProfilesController],
      providers: [TourismEnterpriseProfilesService],
    }).compile();

    controller = module.get<TourismEnterpriseProfilesController>(TourismEnterpriseProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
