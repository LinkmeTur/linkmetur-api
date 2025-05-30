import { Test, TestingModule } from '@nestjs/testing';
import { CorporationProfileController } from './corporation-profile.controller';
import { CorporationProfileService } from './corporation-profile.service';

describe('CorporationProfileController', () => {
  let controller: CorporationProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorporationProfileController],
      providers: [CorporationProfileService],
    }).compile();

    controller = module.get<CorporationProfileController>(CorporationProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
