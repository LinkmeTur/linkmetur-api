import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceSupplierProfilesService } from './service-supplier-profiles.service';
import { CreateServiceSupplierProfileDto } from './dto/create-service-supplier-profile.dto';
import { UpdateServiceSupplierProfileDto } from './dto/update-service-supplier-profile.dto';

@Controller('service-supplier-profiles')
export class ServiceSupplierProfilesController {
  constructor(private readonly serviceSupplierProfilesService: ServiceSupplierProfilesService) {}

  @Post()
  create(@Body() createServiceSupplierProfileDto: CreateServiceSupplierProfileDto) {
    return this.serviceSupplierProfilesService.create(createServiceSupplierProfileDto);
  }

  @Get()
  findAll() {
    return this.serviceSupplierProfilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceSupplierProfilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceSupplierProfileDto: UpdateServiceSupplierProfileDto) {
    return this.serviceSupplierProfilesService.update(+id, updateServiceSupplierProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceSupplierProfilesService.remove(+id);
  }
}
