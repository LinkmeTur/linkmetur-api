// src/proposal/proposal.controller.ts
import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProposalService } from './proposal.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { ProposalResponseDto } from './dto/proposal-response.dto';

import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from 'src/authentications/sevices/jwt-guard.guad';
import { CurrentUser } from 'src/authentications/sevices/current-user.decorator';
import { Proposal } from './entities/proposal.entity';

@ApiTags('Proposals')
@Controller('proposals')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enviar uma proposta para um RFP' })
  @ApiBody({ type: CreateProposalDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: ProposalResponseDto })
  async create(
    @Body() dto: CreateProposalDto,
    @CurrentUser() user: User,
  ): Promise<ProposalResponseDto> {
    const proposal = await this.proposalService.create(
      dto,
      user.corp_id,
      user.id,
    );
    return this.toResponseDto(proposal);
  }

  @Get('rfp/:rfpId')
  @ApiOperation({ summary: 'Listar todas as propostas de um RFP' })
  @ApiParam({ name: 'rfpId' })
  async findAllByRfp(
    @Param('rfpId') rfpId: string,
  ): Promise<ProposalResponseDto[]> {
    const proposals = await this.proposalService.findAllByRfp(rfpId);
    return proposals.map((prop) => this.toResponseDto(prop));
  }

  @Get('mine')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar minhas propostas enviadas' })
  async findAllByCorporation(
    @CurrentUser() user: User,
  ): Promise<ProposalResponseDto[]> {
    const proposals = await this.proposalService.findAllByCorporation(
      user.corp_id,
    );
    return proposals.map((prop) => this.toResponseDto(prop));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter proposta por ID' })
  @ApiParam({ name: 'id' })
  async findOne(@Param('id') id: string): Promise<ProposalResponseDto> {
    const proposal = await this.proposalService.findOne(id);
    return this.toResponseDto(proposal);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar proposta (apenas se enviada)' })
  @ApiParam({ name: 'id' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProposalDto,
    @CurrentUser() user: User,
  ): Promise<ProposalResponseDto> {
    const proposal = await this.proposalService.update(id, dto, user.corp_id);
    return this.toResponseDto(proposal);
  }

  @Post(':id/select')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Selecionar proposta (apenas dono do RFP)' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async select(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<void> {
    return await this.proposalService.markAsSelected(id, user.corp_id);
  }

  private toResponseDto(proposal: Proposal): ProposalResponseDto {
    return {
      id: proposal.id,
      resumo_proposta: proposal.resumo_proposta,
      valor_proposta: proposal.valor_proposta,
      observacoes: proposal.observacoes,
      prazo: proposal.prazo,
      status: proposal.status,
      selecionado: proposal.selecionado,
      fotos:
        proposal.fotos?.map((f) => ({
          id: f.id,
          photo_url: f.photo_url,
          photo_alt: f.photo_alt,
          created_at: f.created_at,
        })) || [],
      rfp_id: proposal.rfp_id,
      corp_id: proposal.corp_id,
      user_id: proposal.user_id,
      created_at: proposal.created_at,
      updated_at: proposal.updated_at,
    };
  }
}
