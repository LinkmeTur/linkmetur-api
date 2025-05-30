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
exports.RequestForProposal = void 0;
const baseEntity_1 = require("../../database/entities/baseEntity");
const proposal_entity_1 = require("../../proposal/entities/proposal.entity");
const typeorm_1 = require("typeorm");
const request_photos_entity_1 = require("./request-photos.entity");
let RequestForProposal = class RequestForProposal extends baseEntity_1.BaseEntity {
    corpID;
    titulo;
    descricao;
    detalhes;
    valor_medio;
    tipo;
    fotos;
    proposals;
};
exports.RequestForProposal = RequestForProposal;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RequestForProposal.prototype, "corpID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RequestForProposal.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RequestForProposal.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RequestForProposal.prototype, "detalhes", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RequestForProposal.prototype, "valor_medio", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RequestForProposal.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => request_photos_entity_1.RequestPhotos, (f) => f.request),
    __metadata("design:type", Array)
], RequestForProposal.prototype, "fotos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => proposal_entity_1.Proposal, (p) => p.request),
    __metadata("design:type", Array)
], RequestForProposal.prototype, "proposals", void 0);
exports.RequestForProposal = RequestForProposal = __decorate([
    (0, typeorm_1.Entity)()
], RequestForProposal);
//# sourceMappingURL=request-for-proposal.entity.js.map