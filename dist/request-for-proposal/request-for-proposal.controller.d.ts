import { RequestForProposalService } from './request-for-proposal.service';
import { CreateRequestForProposalDto } from './dto/create-request-for-proposal.dto';
import { UpdateRequestForProposalDto } from './dto/update-request-for-proposal.dto';
export declare class RequestForProposalController {
    private readonly requestForProposalService;
    constructor(requestForProposalService: RequestForProposalService);
    create(createRequestForProposalDto: CreateRequestForProposalDto): Promise<import("./entities/request-for-proposal.entity").RequestForProposal>;
    findAll(): Promise<import("./entities/request-for-proposal.entity").RequestForProposal[]>;
    findAllForCorporation(corpID: string): Promise<import("./entities/request-for-proposal.entity").RequestForProposal[]>;
    findOne(id: string): Promise<import("./entities/request-for-proposal.entity").RequestForProposal | null>;
    update(id: string, updateRequestForProposalDto: UpdateRequestForProposalDto): Promise<import("./entities/request-for-proposal.entity").RequestForProposal | null>;
    remove(id: string): Promise<void>;
}
