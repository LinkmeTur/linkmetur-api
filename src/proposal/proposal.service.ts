import { Injectable } from '@nestjs/common';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proposal } from './entities/proposal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProposalService {
  constructor(
    @InjectRepository(Proposal)
    private readonly proposalRepository: Repository<Proposal>,
  ) {}
  async create(createProposalDto: CreateProposalDto) {
    const newProposal = this.proposalRepository.create(createProposalDto);
    return await this.proposalRepository.save(newProposal);
  }

  async findAll(): Promise<Proposal[]> {
    return await this.proposalRepository.find({
      relations: ['request', 'fotos'],
    });
  }
  async findAllProposalForCoporation(corpID: string): Promise<Proposal[]> {
    return await this.proposalRepository.find({
      where: { corpID },
      relations: ['request', 'fotos'],
    });
  }

  async findOne(id: string) {
    return await this.proposalRepository.findOne({
      where: { id },
      relations: ['request', 'fotos'],
    });
  }

  async update(id: string, updateProposalDto: UpdateProposalDto) {
    await this.proposalRepository.update(id, updateProposalDto);
    return await this.proposalRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.proposalRepository.delete(id);
  }
}
