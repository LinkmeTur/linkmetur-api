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
exports.RequestForProposalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const request_for_proposal_entity_1 = require("./entities/request-for-proposal.entity");
let RequestForProposalService = class RequestForProposalService {
    requestForProposalRepository;
    constructor(requestForProposalRepository) {
        this.requestForProposalRepository = requestForProposalRepository;
    }
    async create(createRequestForProposalDto) {
        const newRequest = this.requestForProposalRepository.create(createRequestForProposalDto);
        return await this.requestForProposalRepository.save(newRequest);
    }
    async findAll() {
        return await this.requestForProposalRepository.find();
    }
    async findAllForCorporation(corpID) {
        return await this.requestForProposalRepository.find({ where: { corpID } });
    }
    async findOne(id) {
        return await this.requestForProposalRepository.findOne({ where: { id } });
    }
    async update(id, updateRequestForProposalDto) {
        await this.requestForProposalRepository.update(id, updateRequestForProposalDto);
        return await this.requestForProposalRepository.findOne({ where: { id } });
    }
    async remove(id) {
        await this.requestForProposalRepository.delete(id);
    }
};
exports.RequestForProposalService = RequestForProposalService;
exports.RequestForProposalService = RequestForProposalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(request_for_proposal_entity_1.RequestForProposal)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RequestForProposalService);
//# sourceMappingURL=request-for-proposal.service.js.map