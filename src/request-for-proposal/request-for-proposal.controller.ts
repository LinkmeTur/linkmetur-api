// src/request-for-proposal/request-for-proposal.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RequestForProposalService } from './request-for-proposal.service';
import { JwtAuthGuard } from 'src/authentications/sevices/jwt-guard.guad';
import { CreateRfpDto } from './dto/create-request-for-proposal.dto';
import { RfpResponseDto } from './dto/rfp-response.dto';
import { CurrentUser } from 'src/authentications/sevices/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { RequestForProposal } from './entities/request-for-proposal.entity';
import { UpdateRequestForProposalDto } from './dto/update-request-for-proposal.dto';

@ApiTags('Request For Proposal (RFP)')
@Controller('rfps')
export class RequestForProposalController {
  constructor(private readonly rfpService: RequestForProposalService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar um novo RFP (solicitação de propostas)' })
  @ApiBody({ type: CreateRfpDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: RfpResponseDto })
  async create(
    @Body() dto: CreateRfpDto,
    @CurrentUser() user: User,
  ): Promise<RfpResponseDto> {
    const rfp = await this.rfpService.create(dto, user.corp_id);
    return this.toResponseDto(rfp);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os RFPs abertos' })
  @ApiResponse({ status: HttpStatus.OK, type: [RfpResponseDto] })
  async findAll(): Promise<RfpResponseDto[]> {
    const rfps = await this.rfpService.findAll();
    return rfps.map((rfp) => this.toResponseDto(rfp));
  }

  @Get('mine')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar meus RFPs (criados ou direcionados)' })
  async findAllByCorporation(
    @CurrentUser() user: User,
  ): Promise<RfpResponseDto[]> {
    const rfps = await this.rfpService.findAllByCorporation(user.corp_id);
    return rfps.map((rfp) => this.toResponseDto(rfp));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter RFP por ID' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: HttpStatus.OK, type: RfpResponseDto })
  async findOne(@Param('id') id: string): Promise<RfpResponseDto> {
    const rfp = await this.rfpService.findOne(id);
    return this.toResponseDto(rfp);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar RFP' })
  @ApiParam({ name: 'id' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRequestForProposalDto,
    @CurrentUser() user: User,
  ): Promise<RfpResponseDto> {
    const rfp = await this.rfpService.update(id, dto, user.corp_id);
    return this.toResponseDto(rfp);
  }

  @Post(':id/close')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Encerrar RFP (não aceita mais propostas)' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async close(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<void> {
    return await this.rfpService.close(id, user.corp_id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover RFP (apenas se aberto)' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<void> {
    return await this.rfpService.remove(id, user.corp_id);
  }

  private toResponseDto(rfp: RequestForProposal): RfpResponseDto {
    return {
      id: rfp.id,
      titulo: rfp.titulo,
      descricao: rfp.descricao,
      detalhes: rfp.detalhes,
      valor_medio: rfp.valor_medio,
      tipo: rfp.tipo,
      prazo: rfp.prazo,
      status: rfp.status,
      job_id: rfp.job_id,
      prestador_id: rfp.prestador_id,
      fotos:
        rfp.fotos?.map((f) => ({
          id: f.id,
          photo_URL: f.photo_URL,
          photo_alt: f.photo_alt,
          created_at: f.created_at,
        })) || [],
      corp_id: rfp.corp_id,
      created_at: rfp.created_at,
      updated_at: rfp.updated_at,
    };
  }
}
