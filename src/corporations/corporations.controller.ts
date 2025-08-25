import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CorporationsService } from './corporations.service';
import { CreateCorporationDto } from './dto/create-corporation.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Corporation } from './entities/corporation.entity';
import { UpdateCorporationDto } from './dto/update-corporation.dto';

@ApiTags('Corporations')
@Controller('corporations')
export class CorporationsController {
  constructor(private readonly corporationsService: CorporationsService) {}

  // 🟢 CREATE
  @Post()
  @ApiOperation({ summary: 'Criar uma nova empresa (Corporation)' })
  @ApiBody({ type: CreateCorporationDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Empresa criada com sucesso.',
    type: Corporation,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'CNPJ já cadastrado.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos.',
  })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateCorporationDto): Promise<Corporation> {
    return await this.corporationsService.create(createDto);
  }

  // 🔍 FIND ALL
  @Get()
  @ApiOperation({ summary: 'Listar todas as empresas' })
  @ApiOkResponse({
    description: 'Lista de empresas retornada com sucesso.',
    type: [Corporation],
  })
  async findAll(): Promise<Corporation[]> {
    return await this.corporationsService.findAll();
  }

  @Get('type/:tipo')
  @ApiOperation({ summary: 'Listar empresas por tipo (MATRIZ/FILIAL)' })
  @ApiParam({ name: 'tipo', example: 'T', description: 'Tipo da empresa' })
  @ApiOkResponse({ type: [Corporation] })
  async findForType(@Param('tipo') tipo: string): Promise<Corporation[]> {
    return await this.corporationsService.findForType(tipo);
  }

  // 🔍 FIND BY ID
  @Get(':id')
  @ApiOperation({ summary: 'Obter empresa por ID' })
  @ApiParam({ name: 'id', description: 'ID da empresa' })
  @ApiOkResponse({ type: Corporation })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Empresa não encontrada.',
  })
  async findOne(@Param('id') id: string): Promise<Corporation | string> {
    return await this.corporationsService.findOne(id);
  }

  // 🔍 FIND BY CNPJ
  @Get('cnpj/:cnpj')
  @ApiOperation({ summary: 'Buscar empresa por CNPJ' })
  @ApiParam({ name: 'cnpj', description: 'CNPJ com 14 dígitos' })
  @ApiOkResponse({ type: Corporation })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Empresa não encontrada.',
  })
  async findByCnpj(@Param('cnpj') cnpj: string): Promise<Corporation> {
    return await this.corporationsService.findByCnpj(cnpj);
  }

  // 🔍 FIND BY NAME
  @Get('search/name')
  @ApiOperation({
    summary: 'Buscar empresas por nome (razão social ou fantasia)',
  })
  @ApiQuery({ name: 'name', description: 'Nome da empresa' })
  @ApiOkResponse({ type: [Corporation] })
  async findByNameCorporation(
    @Query('name') name: string,
  ): Promise<Corporation[]> {
    if (!name || name.trim().length < 2) {
      throw new Error('Nome deve ter pelo menos 2 caracteres');
    }
    return await this.corporationsService.findByNameCorporation(name);
  }

  // 🟡 UPDATE
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar empresa por ID' })
  @ApiParam({ name: 'id', description: 'ID da empresa' })
  @ApiBody({ type: UpdateCorporationDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Empresa atualizada com sucesso.',
    type: Corporation,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Empresa não encontrada.',
  })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCorporationDto,
  ): Promise<Corporation | string> {
    return await this.corporationsService.update(id, updateDto);
  }

  // 🔴 DELETE
  @Delete(':id')
  @ApiOperation({ summary: 'Remover empresa por ID' })
  @ApiParam({ name: 'id', description: 'ID da empresa' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Empresa removida com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Empresa não encontrada.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.corporationsService.remove(id);
  }

  // 🔍 EXTERNO: CONSULTA CNPJ
  @Get('consulta/cnpj/:cnpj')
  @ApiOperation({ summary: 'Consulta externa de CNPJ (via publica.cnpj.ws)' })
  @ApiParam({ name: 'cnpj', description: 'CNPJ com 14 dígitos' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dados do CNPJ retornados pela API externa.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'CNPJ inválido ou erro na consulta.',
  })
  async consultaCNPJ(@Param('cnpj') cnpj: string): Promise<any> {
    return await this.corporationsService.consultaCNPJ(cnpj);
  }

  // 🔍 EXTERNO: CONSULTA CEP
  @Get('consulta/cep/:cep')
  @ApiOperation({ summary: 'Consulta externa de CEP (via BrasilAPI)' })
  @ApiParam({ name: 'cep', description: 'CEP com 8 dígitos' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endereço retornado pela API externa.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'CEP inválido ou erro na consulta.',
  })
  async consultaCep(@Param('cep') cep: string): Promise<any> {
    return await this.corporationsService.consultaCep(cep);
  }
}
