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
  Query,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Criar um novo job' })
  @ApiBody({ type: CreateJobDto })
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os jobs' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query() query: { page?: string; limit?: string }) {
    return this.jobsService.findAll({
      page: Number(query.page),
      limit: Number(query.limit),
    });
  }

  @Get('allJobFilter')
  @ApiOperation({ summary: 'Listar todos os jobs' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'orderBy', required: false, type: String })
  @ApiQuery({ name: 'min_valor', required: false, type: Number })
  @ApiQuery({ name: 'max_valor', required: false, type: Number })
  @ApiQuery({ name: 'min_rating', required: false, type: Number })
  @ApiQuery({ name: 'nome_servico', required: false, type: String })
  @ApiQuery({ name: 'categoria', required: false, type: String })
  @ApiQuery({ name: 'localizacao', required: false, type: String })
  async findFiltered(
    @Query()
    filters: {
      nome_servico?: string;
      categoria?: string;
      localizacao?: string;
      min_valor?: number;
      max_valor?: number;
      min_rating?: number;
      orderBy?: 'relevance' | 'rating' | 'price-asc' | 'price-desc';
      page: number;
      limit: number;
    },
  ) {
    const query = {
      ...filters,
      page: Number(filters.page),
      limit: Number(filters.limit),
      min_rating: Number(filters.min_rating),
      min_valor: Number(filters.min_valor),
      max_valor: Number(filters.max_valor),
    };

    return await this.jobsService.findFiltered(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Get('corp/:corpId')
  @ApiOperation({ summary: 'Listar todos os jobs de uma empresa' })
  @ApiParam({ name: 'corpId', required: true, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findForCorporation(
    @Param('corpId') corpId: string,
    @Query() query: { page?: string; limit?: string },
  ) {
    const { page, limit } = query;
    return this.jobsService.findForCorporation(
      corpId,
      Number(page),
      Number(limit),
    );
  }

  @Get('corpfilter/:corpId')
  @ApiOperation({ summary: 'Listar todos os jobs de uma empresa' })
  @ApiParam({ name: 'corpId', required: true, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'orderBy', required: false, type: String })
  @ApiQuery({ name: 'min_valor', required: false, type: Number })
  @ApiQuery({ name: 'max_valor', required: false, type: Number })
  @ApiQuery({ name: 'min_rating', required: false, type: Number })
  @ApiQuery({ name: 'nome_servico', required: false, type: String })
  @ApiQuery({ name: 'categoria', required: false, type: String })
  @ApiQuery({ name: 'localizacao', required: false, type: String })
  async findFilteredForCorp(
    @Param('corpId') corpId: string,
    @Query()
    filters: {
      nome_servico?: string;
      categoria?: string;
      localizacao?: string;
      min_valor?: number;
      max_valor?: number;
      min_rating?: number;
      orderBy?: 'relevance' | 'rating' | 'price-asc' | 'price-desc';
      page: number;
      limit: number;
    },
  ) {
    const query = {
      ...filters,
      page: Number(filters.page),
      limit: Number(filters.limit),
      min_rating: Number(filters.min_rating),
      min_valor: Number(filters.min_valor),
      max_valor: Number(filters.max_valor),
    };
    return await this.jobsService.findFilteredForCorp(corpId, query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }
}
