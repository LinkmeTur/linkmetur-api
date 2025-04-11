import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceSupplierProfileDto } from './create-service-supplier-profile.dto';

export class UpdateServiceSupplierProfileDto extends PartialType(CreateServiceSupplierProfileDto) {}
