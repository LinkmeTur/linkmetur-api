import { CreateRequestForProposalDto } from './dto/create-request-for-proposal.dto';
import { UpdateRequestForProposalDto } from './dto/update-request-for-proposal.dto';
import { Repository } from 'typeorm';
import { RequestForProposal } from './entities/request-for-proposal.entity';
export declare class RequestForProposalService {
    private readonly requestForProposalRepository;
    constructor(requestForProposalRepository: Repository<RequestForProposal>);
    create(createRequestForProposalDto: CreateRequestForProposalDto): Promise<RequestForProposal>;
    findAll(): Promise<RequestForProposal[]>;
    findAllForCorporation(corpID: string): Promise<RequestForProposal[]>;
    findOne(id: string): Promise<RequestForProposal | null>;
    update(id: string, updateRequestForProposalDto: UpdateRequestForProposalDto): Promise<RequestForProposal | null>;
    remove(id: string): Promise<void>;
}
