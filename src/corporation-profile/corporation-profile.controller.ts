import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CorporationProfileService } from './corporation-profile.service';
import { CreateCorporationProfileDto } from './dto/create-corporation-profile.dto';
import { UpdateCorporationProfileDto } from './dto/update-corporation-profile.dto';

@Controller('corporation-profile')
export class CorporationProfileController {
  constructor(
    private readonly corporationProfileService: CorporationProfileService,
  ) {}

  @Post()
  create(@Body() createCorporationProfileDto: CreateCorporationProfileDto) {
    return this.corporationProfileService.create(createCorporationProfileDto);
  }

  @Get()
  findAll() {
    return this.corporationProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.corporationProfileService.findOne(id);
  }
  @Get('corp/:corpID')
  findOneByCorporationId(@Param('corpID') corpID: string) {
    return this.corporationProfileService.findOneByCorporationId(corpID);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCorporationProfileDto: UpdateCorporationProfileDto,
  ) {
    return this.corporationProfileService.update(
      id,
      updateCorporationProfileDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.corporationProfileService.remove(id);
  }
}
