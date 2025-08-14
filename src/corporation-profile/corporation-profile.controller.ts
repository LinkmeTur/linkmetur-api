import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CorporationProfileService } from './corporation-profile.service';
import { CreateCorporationProfileDto } from './dto/create-corporation-profile.dto';
import { UpdateCorporationProfileDto } from './dto/update-corporation-profile.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentications/sevices/jwt-guard.guad';

@ApiTags('corporation-profile')
@Controller('corporation-profile')
export class CorporationProfileController {
  constructor(private readonly profileService: CorporationProfileService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Criar perfil para uma empresa' })
  @ApiBody({ type: CreateCorporationProfileDto })
  @ApiResponse({ status: 201, description: 'Perfil criado com sucesso' })
  create(@Body() createDto: CreateCorporationProfileDto) {
    return this.profileService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os perfis' })
  @ApiResponse({ status: 200, description: 'Lista de perfis' })
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter perfil por ID' })
  @ApiResponse({ status: 200, description: 'Perfil encontrado' })
  @ApiResponse({ status: 404, description: 'Perfil não encontrado' })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Get('corporation/:corpId')
  @ApiOperation({ summary: 'Obter perfil por ID da empresa' })
  @ApiResponse({ status: 200, description: 'Perfil encontrado' })
  @ApiResponse({ status: 404, description: 'Perfil não encontrado' })
  findByCorpId(@Param('corpId') corpId: string) {
    return this.profileService.findByCorpId(corpId);
  }

  @Patch(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar perfil' })
  @ApiResponse({ status: 200, description: 'Perfil atualizado' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCorporationProfileDto,
  ) {
    return this.profileService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remover perfil' })
  @ApiResponse({ status: 204, description: 'Perfil removido' })
  remove(@Param('id') id: string): Promise<void> {
    return this.profileService.remove(id);
  }
}
