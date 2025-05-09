import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CorporationsService } from './corporations.service';
import { CreateCorporationDto } from './dto/create-corporation.dto';
import { UpdateCorporationDto } from './dto/update-corporation.dto';

@Controller('corporations')
export class CorporationsController {
  constructor(private readonly corporationsService: CorporationsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createCorporationDto: CreateCorporationDto) {
    return this.corporationsService.create(createCorporationDto);
  }

  @Get()
  findAll() {
    return this.corporationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.corporationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCorporationDto: UpdateCorporationDto,
  ) {
    return this.corporationsService.update(id, updateCorporationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.corporationsService.remove(id);
  }

  @Get('consulta-cnpj/:cnpj')
  consultCNPJ(@Param('cnpj') cnpj: string): Promise<any> {
    console.log(cnpj);
    return this.corporationsService.consultaCNPJ(cnpj);
  }
}
