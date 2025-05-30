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
exports.Proposal = void 0;
const baseEntity_1 = require("../../database/entities/baseEntity");
const request_for_proposal_entity_1 = require("../../request-for-proposal/entities/request-for-proposal.entity");
const typeorm_1 = require("typeorm");
const proposal_photos_entity_1 = require("./proposal-photos.entity");
let Proposal = class Proposal extends baseEntity_1.BaseEntity {
    reqId;
    corpID;
    resumo_proposta;
    valor_proposta;
    observações;
    prazo;
    status;
    request;
    fotos;
};
exports.Proposal = Proposal;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Proposal.prototype, "reqId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Proposal.prototype, "corpID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Proposal.prototype, "resumo_proposta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Proposal.prototype, "valor_proposta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Proposal.prototype, "observa\u00E7\u00F5es", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Proposal.prototype, "prazo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Proposal.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => request_for_proposal_entity_1.RequestForProposal, (r) => r.proposals),
    __metadata("design:type", request_for_proposal_entity_1.RequestForProposal)
], Proposal.prototype, "request", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => proposal_photos_entity_1.ProposalPhotos, (f) => f.proposal),
    __metadata("design:type", Array)
], Proposal.prototype, "fotos", void 0);
exports.Proposal = Proposal = __decorate([
    (0, typeorm_1.Entity)()
], Proposal);
//# sourceMappingURL=proposal.entity.js.map