import { Injectable } from '@nestjs/common';
import { CreateServiceSupplierProfileDto } from './dto/create-service-supplier-profile.dto';
import { UpdateServiceSupplierProfileDto } from './dto/update-service-supplier-profile.dto';

@Injectable()
export class ServiceSupplierProfilesService {
  create(createServiceSupplierProfileDto: CreateServiceSupplierProfileDto) {
    return 'This action adds a new serviceSupplierProfile';
  }

  findAll() {
    return `This action returns all serviceSupplierProfiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceSupplierProfile`;
  }

  update(id: number, updateServiceSupplierProfileDto: UpdateServiceSupplierProfileDto) {
    return `This action updates a #${id} serviceSupplierProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceSupplierProfile`;
  }
}
