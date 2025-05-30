import { ProposalService } from './proposal.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
export declare class ProposalController {
    private readonly proposalService;
    constructor(proposalService: ProposalService);
    create(createProposalDto: CreateProposalDto): Promise<import("./entities/proposal.entity").Proposal>;
    findAll(): Promise<import("./entities/proposal.entity").Proposal[]>;
    findAllProposalForCorporation(corpID: string): Promise<import("./entities/proposal.entity").Proposal[]>;
    findOne(id: string): Promise<import("./entities/proposal.entity").Proposal | null>;
    update(id: string, updateProposalDto: UpdateProposalDto): Promise<import("./entities/proposal.entity").Proposal | null>;
    remove(id: string): Promise<void>;
}
