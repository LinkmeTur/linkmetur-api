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
exports.ProposalController = void 0;
const common_1 = require("@nestjs/common");
const proposal_service_1 = require("./proposal.service");
const create_proposal_dto_1 = require("./dto/create-proposal.dto");
const update_proposal_dto_1 = require("./dto/update-proposal.dto");
let ProposalController = class ProposalController {
    proposalService;
    constructor(proposalService) {
        this.proposalService = proposalService;
    }
    async create(createProposalDto) {
        return await this.proposalService.create(createProposalDto);
    }
    async findAll() {
        return await this.proposalService.findAll();
    }
    async findAllProposalForCorporation(corpID) {
        return await this.proposalService.findAllProposalForCoporation(corpID);
    }
    async findOne(id) {
        return await this.proposalService.findOne(id);
    }
    async update(id, updateProposalDto) {
        return await this.proposalService.update(id, updateProposalDto);
    }
    async remove(id) {
        return await this.proposalService.remove(id);
    }
};
exports.ProposalController = ProposalController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_proposal_dto_1.CreateProposalDto]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('corporation/:corpID'),
    __param(0, (0, common_1.Param)('corpID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "findAllProposalForCorporation", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_proposal_dto_1.UpdateProposalDto]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "remove", null);
exports.ProposalController = ProposalController = __decorate([
    (0, common_1.Controller)('proposal'),
    __metadata("design:paramtypes", [proposal_service_1.ProposalService])
], ProposalController);
//# sourceMappingURL=proposal.controller.js.map