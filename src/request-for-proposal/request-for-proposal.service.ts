import { Injectable } from '@nestjs/common';
import { CreateRequestForProposalDto } from './dto/create-request-for-proposal.dto';
import { UpdateRequestForProposalDto } from './dto/update-request-for-proposal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestForProposal } from './entities/request-for-proposal.entity';

@Injectable()
export class RequestForProposalService {
  constructor(
    @InjectRepository(RequestForProposal)
    private readonly requestForProposalRepository: Repository<RequestForProposal>,
  ) {}
  async create(createRequestForProposalDto: CreateRequestForProposalDto) {
    const newRequest = this.requestForProposalRepository.create(
      createRequestForProposalDto,
    );
    return await this.requestForProposalRepository.save(newRequest);
  }

  async findAll() {
    return await this.requestForProposalRepository.find();
  }
  async findAllForCorporation(corpID: string) {
    return await this.requestForProposalRepository.find({ where: { corpID } });
  }

  async findOne(id: string) {
    return await this.requestForProposalRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateRequestForProposalDto: UpdateRequestForProposalDto,
  ) {
    await this.requestForProposalRepository.update(
      id,
      updateRequestForProposalDto,
    );
    return await this.requestForProposalRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.requestForProposalRepository.delete(id);
  }
}
