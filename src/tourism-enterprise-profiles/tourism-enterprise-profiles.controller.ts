import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TourismEnterpriseProfilesService } from './tourism-enterprise-profiles.service';
import { CreateTourismEnterpriseProfileDto } from './dto/create-tourism-enterprise-profile.dto';
import { UpdateTourismEnterpriseProfileDto } from './dto/update-tourism-enterprise-profile.dto';

@Controller('tourism-enterprise-profiles')
export class TourismEnterpriseProfilesController {
  constructor(private readonly tourismEnterpriseProfilesService: TourismEnterpriseProfilesService) {}

  @Post()
  create(@Body() createTourismEnterpriseProfileDto: CreateTourismEnterpriseProfileDto) {
    return this.tourismEnterpriseProfilesService.create(createTourismEnterpriseProfileDto);
  }

  @Get()
  findAll() {
    return this.tourismEnterpriseProfilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourismEnterpriseProfilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourismEnterpriseProfileDto: UpdateTourismEnterpriseProfileDto) {
    return this.tourismEnterpriseProfilesService.update(+id, updateTourismEnterpriseProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourismEnterpriseProfilesService.remove(+id);
  }
}
