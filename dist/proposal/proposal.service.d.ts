import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { Proposal } from './entities/proposal.entity';
import { Repository } from 'typeorm';
export declare class ProposalService {
    private readonly proposalRepository;
    constructor(proposalRepository: Repository<Proposal>);
    create(createProposalDto: CreateProposalDto): Promise<Proposal>;
    findAll(): Promise<Proposal[]>;
    findAllProposalForCoporation(corpID: string): Promise<Proposal[]>;
    findOne(id: string): Promise<Proposal | null>;
    update(id: string, updateProposalDto: UpdateProposalDto): Promise<Proposal | null>;
    remove(id: string): Promise<void>;
}
