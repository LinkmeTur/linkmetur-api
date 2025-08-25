// src/request/request.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './entities/request.entity';
import { RequestForProposal } from '../request-for-proposal/entities/request-for-proposal.entity';
import { Proposal } from '../proposal/entities/proposal.entity';
import { Job } from '../job/entities/job.entity';
import { Corporation } from '../corporations/entities/corporation.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepo: Repository<Request>,
    @InjectRepository(RequestForProposal)
    private readonly rfpRepo: Repository<RequestForProposal>,
    @InjectRepository(Proposal)
    private readonly proposalRepo: Repository<Proposal>,
    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>,
    @InjectRepository(Corporation)
    private readonly corpRepo: Repository<Corporation>,
  ) {}

  /**
   * Gera um Request ao aceitar uma Proposal
   */
  async createFromProposal(
    proposalId: string,
    userId: string,
  ): Promise<Request> {
    const proposal = await this.proposalRepo.findOne({
      where: { id: proposalId },
      relations: ['rfp', 'rfp.corporation', 'rfp.job', 'corporation'],
    });

    if (!proposal) {
      throw new NotFoundException(`Proposal #${proposalId} não encontrada.`);
    }

    // Verifica se o usuário é o dono do RFP
    if (proposal.rfp.corp_id !== userId) {
      throw new ForbiddenException(
        'Apenas o dono do RFP pode gerar o contrato.',
      );
    }

    // Verifica se já existe um Request para este RFP
    const existing = await this.requestRepo.findOne({
      where: { rfp_id: proposal.rfp.id },
    });
    if (existing) {
      throw new ForbiddenException('Este RFP já gerou um contrato.');
    }

    // Atualiza o status do RFP
    proposal.rfp.status = 'encerrado';
    await this.rfpRepo.save(proposal.rfp);

    // Marca a proposta como aceita
    proposal.status = 'aceita';
    proposal.selecionado = true;
    await this.proposalRepo.save(proposal);

    // Busca dados necessários
    const job = await this.jobRepo.findOne({
      where: { id: proposal.rfp.job_id },
    });
    const prestador = await this.corpRepo.findOne({
      where: { id: proposal.corp_id },
    });
    const contratante = await this.corpRepo.findOne({
      where: { id: proposal.rfp.corp_id },
    });

    if (!job || !prestador || !contratante) {
      throw new NotFoundException('Dados não encontrados.');
    }

    const request = this.requestRepo.create({
      rfp_id: proposal.rfp.id,
      proposal_id: proposal.id,
      job_id: job.id,
      corp_id: contratante.id,
      user_id: prestador.id,
      rfp: proposal.rfp,
      proposal,
      job,
      corporation: contratante,
      prestador,
      nome_job: job?.nome_servico || proposal.rfp.titulo,
      nome_corp: contratante.razao_social,
      nome_prestador: prestador.razao_social,
      prazo: proposal.prazo,
      status: 'ativo',
    });

    return await this.requestRepo.save(request);
  }

  /**
   * Busca todos os Requests de uma corporation (contratante ou prestador)
   */
  async findAllByCorporation(corpId: string): Promise<Request[]> {
    return await this.requestRepo.find({
      where: [{ corp_id: corpId }, { user_id: corpId }],
      relations: ['rfp', 'proposal', 'job', 'corporation', 'prestador'],
    });
  }

  /**
   * Busca um Request específico
   */
  async findOne(id: string, corpId: string): Promise<Request> {
    const request = await this.requestRepo.findOne({
      where: { id },
      relations: ['rfp', 'proposal', 'job', 'corporation', 'prestador'],
    });

    if (!request) {
      throw new NotFoundException(`Request #${id} não encontrado.`);
    }

    // Verifica permissão
    if (request.corp_id !== corpId && request.user_id !== corpId) {
      throw new ForbiddenException('Acesso negado.');
    }

    return request;
  }

  /**
   * Atualiza o status do Request
   */
  async updateStatus(
    id: string,
    status: string,
    corpId: string,
  ): Promise<Request> {
    const request = await this.findOne(id, corpId);

    if (!['ativo', 'concluído', 'cancelado'].includes(status)) {
      throw new ForbiddenException('Status inválido.');
    }

    if (request.status === 'concluído' || request.status === 'cancelado') {
      throw new ForbiddenException('Este contrato já foi finalizado.');
    }

    request.status = status;
    return await this.requestRepo.save(request);
  }
}
