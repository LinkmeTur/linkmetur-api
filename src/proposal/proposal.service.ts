import { Injectable } from '@nestjs/common';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proposal } from './entities/proposal.entity';
import { Repository } from 'typeorm';
import { ProposalPhotos } from './entities/proposal-photos.entity';

@Injectable()
export class ProposalService {
  constructor(
    @InjectRepository(Proposal)
    private readonly proposalRepository: Repository<Proposal>,
    @InjectRepository(ProposalPhotos)
    private readonly proposalPhotosRepository: Repository<ProposalPhotos>,
  ) {}
  async create(createProposalDto: CreateProposalDto) {
    console.log(createProposalDto);
    const { fotos, ...newDTO } = createProposalDto;
    const newProposal = this.proposalRepository.create(newDTO);
    console.log(newProposal);
    const saved = await this.proposalRepository.save(newProposal);
    console.log(saved);

    if (fotos && Array.isArray(fotos)) {
      for (const foto of fotos) {
        const novaFoto = this.proposalPhotosRepository.create({
          photo_URL: foto.photo_URL,
          photo_alt: foto.photo_alt,
          proposal_ID: saved.id,
        });
        await this.proposalPhotosRepository.save(novaFoto);
      }
    }
    return saved;
  }

  async findAll(): Promise<Proposal[]> {
    return await this.proposalRepository.find({
      relations: {
        request: true,
        rfp: true,
        fotos: true,
      },
    });
  }
  async findAllProposalForCoporation(corpID: string): Promise<Proposal[]> {
    return await this.proposalRepository.find({
      where: { corpID },
      relations: {
        request: true,
        rfp: true,
        fotos: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.proposalRepository.findOne({
      where: { id },
      relations: {
        request: true,
        rfp: true,
        fotos: true,
      },
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
