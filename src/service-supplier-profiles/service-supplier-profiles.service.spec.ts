import { Test, TestingModule } from '@nestjs/testing';
import { ServiceSupplierProfilesService } from './service-supplier-profiles.service';

describe('ServiceSupplierProfilesService', () => {
  let service: ServiceSupplierProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceSupplierProfilesService],
    }).compile();

    service = module.get<ServiceSupplierProfilesService>(ServiceSupplierProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
