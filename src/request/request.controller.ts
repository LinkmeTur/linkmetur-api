// src/request/request.controller.ts
import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  UseGuards,
  HttpStatus,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { RequestService } from './request.service';
import { RequestResponseDto } from './dto/request-response.dto';
import { User } from '../users/entities/user.entity';
import { Request } from './entities/request.entity';
import { JwtAuthGuard } from 'src/authentications/sevices/jwt-guard.guad';
import { CurrentUser } from 'src/authentications/sevices/current-user.decorator';

@ApiTags('Requests')
@Controller('requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('from-proposal/:proposalId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Gerar contrato (Request) a partir de uma proposta aceita',
  })
  @ApiParam({ name: 'proposalId' })
  @ApiResponse({ status: HttpStatus.CREATED, type: RequestResponseDto })
  async createFromProposal(
    @Param('proposalId') proposalId: string,
    @CurrentUser() user: User,
  ): Promise<RequestResponseDto> {
    const request = await this.requestService.createFromProposal(
      proposalId,
      user.corp_id,
    );
    return this.toResponseDto(request);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listar meus contratos (como contratante ou prestador)',
  })
  async findAll(@CurrentUser() user: User): Promise<RequestResponseDto[]> {
    const requests = await this.requestService.findAllByCorporation(
      user.corp_id,
    );
    return requests.map((request) => this.toResponseDto(request));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter contrato por ID' })
  @ApiParam({ name: 'id' })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<RequestResponseDto> {
    const request = await this.requestService.findOne(id, user.corp_id);
    return this.toResponseDto(request);
  }

  @Put(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar status do contrato' })
  @ApiParam({ name: 'id' })
  @ApiBody({
    schema: {
      properties: {
        status: { type: 'string', enum: ['ativo', 'concluído', 'cancelado'] },
      },
    },
  })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @CurrentUser() user: User,
  ): Promise<RequestResponseDto> {
    const request = await this.requestService.updateStatus(
      id,
      status,
      user.corp_id,
    );
    return this.toResponseDto(request);
  }

  private toResponseDto(request: Request): RequestResponseDto {
    return {
      id: request.id,
      nome_job: request.nome_job,
      nome_corp: request.nome_corp,
      nome_prestador: request.nome_prestador,
      prazo: request.prazo,
      status: request.status,
      rfp_id: request.rfp_id,
      proposal_id: request.proposal_id,
      job_id: request.job_id,
      corp_id: request.corp_id,
      prestador_id: request.user_id,
      created_at: request.created_at,
      updated_at: request.updated_at,
    };
  }
}
