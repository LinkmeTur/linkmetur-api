import { Test, TestingModule } from '@nestjs/testing';
import { ServiceSupplierProfilesController } from './service-supplier-profiles.controller';
import { ServiceSupplierProfilesService } from './service-supplier-profiles.service';

describe('ServiceSupplierProfilesController', () => {
  let controller: ServiceSupplierProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceSupplierProfilesController],
      providers: [ServiceSupplierProfilesService],
    }).compile();

    controller = module.get<ServiceSupplierProfilesController>(ServiceSupplierProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
