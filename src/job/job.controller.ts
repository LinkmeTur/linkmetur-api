// src/jobs/jobs.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobResponseDto } from './dto/job-response.dto';

import { User } from '../users/entities/user.entity';

import { Job } from './entities/job.entity';
import { CurrentUser } from 'src/authentications/sevices/current-user.decorator';
import { JobsService } from './job.service';
import { JwtAuthGuard } from 'src/authentications/sevices/jwt-guard.guad';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // 🟢 CREATE
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar um novo serviço (job)' })
  @ApiBody({ type: CreateJobDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: JobResponseDto })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createDto: CreateJobDto,
    @CurrentUser() user: User,
  ): Promise<JobResponseDto> {
    const job = await this.jobsService.create(createDto, user.corp_id);
    return this.toResponseDto(job);
  }

  // 🔍 FIND ALL
  @Get()
  @ApiOperation({ summary: 'Listar todos os serviços publicados' })
  @ApiResponse({ status: HttpStatus.OK, type: [JobResponseDto] })
  async findAll(): Promise<JobResponseDto[]> {
    const jobs = await this.jobsService.findAll();
    return jobs.map((job) => this.toResponseDto(job));
  }

  // 🔍 BY CORPORATION
  @Get('mine')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar meus serviços' })
  async findAllByCorporation(
    @CurrentUser() user: User,
  ): Promise<JobResponseDto[]> {
    const jobs = await this.jobsService.findAllByCorporation(user.corp_id);
    return jobs.map((job) => this.toResponseDto(job));
  }

  // 🔍 BY ID
  @Get(':id')
  @ApiOperation({ summary: 'Obter serviço por ID' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: HttpStatus.OK, type: JobResponseDto })
  async findOne(@Param('id') id: string): Promise<JobResponseDto> {
    const job = await this.jobsService.findOne(id);
    return this.toResponseDto(job);
  }

  // 🔍 BY CATEGORY
  @Get('category/:categoria')
  @ApiOperation({ summary: 'Buscar serviços por categoria' })
  @ApiParam({ name: 'categoria' })
  async findByCategory(
    @Param('categoria') categoria: string,
  ): Promise<JobResponseDto[]> {
    const jobs = await this.jobsService.findByCategory(categoria);
    return jobs.map((job) => this.toResponseDto(job));
  }

  // 🔍 BY LOCATION
  @Get('location')
  @ApiOperation({ summary: 'Buscar serviços por cidade e estado' })
  @ApiQuery({ name: 'cidade' })
  @ApiQuery({ name: 'estado' })
  async findByLocation(
    @Query('cidade') cidade: string,
    @Query('estado') estado: string,
  ): Promise<JobResponseDto[]> {
    const jobs = await this.jobsService.findByLocation(cidade, estado);
    return jobs.map((job) => this.toResponseDto(job));
  }

  // 🟡 UPDATE
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar serviço' })
  @ApiParam({ name: 'id' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateJobDto,
    @CurrentUser() user: User,
  ): Promise<JobResponseDto> {
    const job = await this.jobsService.update(id, updateDto, user.corp_id);
    return this.toResponseDto(job);
  }

  // 🔴 DELETE
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover serviço' })
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<void> {
    return await this.jobsService.remove(id, user.corp_id);
  }

  // ✅ Conversão para DTO
  private toResponseDto(job: Job): JobResponseDto {
    return {
      id: job.id,
      nome_servico: job.nome_servico,
      categoria: job.categoria,
      sub_categoria: job.sub_categoria,
      descricao: job.descricao,
      min_valor: job.min_valor,
      max_valor: job.max_valor,
      views: job.views,
      total_views: job.total_views,
      video_url: job.video_url,
      certificacoes: job.certificacoes,
      disponibilidade: job.disponibilidade,
      publicado: job.publicado,
      fotos:
        job.fotos?.map((foto) => ({
          id: foto.id,
          photo_url: foto.photo_url,
          photo_alt: foto.photo_alt,
          created_at: foto.created_at,
        })) || [],
      corp_id: job.corp_id,
      created_at: job.created_at,
      updated_at: job.updated_at,
    };
  }
}
