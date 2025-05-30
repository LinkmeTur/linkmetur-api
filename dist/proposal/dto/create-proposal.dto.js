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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProposalDto = void 0;
const class_validator_1 = require("class-validator");
const create_request_for_proposal_dto_1 = require("../../request-for-proposal/dto/create-request-for-proposal.dto");
class CreateProposalDto {
    reqId;
    corpID;
    resumo_proposta;
    valor_proposta;
    observações;
    prazo;
    status;
    request;
    fotos;
}
exports.CreateProposalDto = CreateProposalDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "reqId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "corpID", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "resumo_proposta", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "valor_proposta", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "observa\u00E7\u00F5es", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateProposalDto.prototype, "prazo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", create_request_for_proposal_dto_1.CreateRequestForProposalDto)
], CreateProposalDto.prototype, "request", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateProposalDto.prototype, "fotos", void 0);
//# sourceMappingURL=create-proposal.dto.js.map