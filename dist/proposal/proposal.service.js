"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const proposal_entity_1 = require("./entities/proposal.entity");
const typeorm_2 = require("typeorm");
let ProposalService = class ProposalService {
    proposalRepository;
    constructor(proposalRepository) {
        this.proposalRepository = proposalRepository;
    }
    async create(createProposalDto) {
        const newProposal = this.proposalRepository.create(createProposalDto);
        return await this.proposalRepository.save(newProposal);
    }
    async findAll() {
        return await this.proposalRepository.find({
            relations: ['request', 'fotos'],
        });
    }
    async findAllProposalForCoporation(corpID) {
        return await this.proposalRepository.find({
            where: { corpID },
            relations: ['request', 'fotos'],
        });
    }
    async findOne(id) {
        return await this.proposalRepository.findOne({
            where: { id },
            relations: ['request', 'fotos'],
        });
    }
    async update(id, updateProposalDto) {
        await this.proposalRepository.update(id, updateProposalDto);
        return await this.proposalRepository.findOne({ where: { id } });
    }
    async remove(id) {
        await this.proposalRepository.delete(id);
    }
};
exports.ProposalService = ProposalService;
exports.ProposalService = ProposalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(proposal_entity_1.Proposal)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProposalService);
//# sourceMappingURL=proposal.service.js.map