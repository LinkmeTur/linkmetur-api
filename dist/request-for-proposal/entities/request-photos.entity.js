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
exports.RequestPhotos = void 0;
const typeorm_1 = require("typeorm");
const request_for_proposal_entity_1 = require("./request-for-proposal.entity");
const baseEntity_1 = require("../../database/entities/baseEntity");
let RequestPhotos = class RequestPhotos extends baseEntity_1.BaseEntity {
    request_ID;
    photo;
    photo_URL;
    photo_alt;
    request;
};
exports.RequestPhotos = RequestPhotos;
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], RequestPhotos.prototype, "request_ID", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Buffer)
], RequestPhotos.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RequestPhotos.prototype, "photo_URL", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RequestPhotos.prototype, "photo_alt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => request_for_proposal_entity_1.RequestForProposal, (request) => request.fotos),
    (0, typeorm_1.JoinColumn)({ name: 'request_ID' }),
    __metadata("design:type", request_for_proposal_entity_1.RequestForProposal)
], RequestPhotos.prototype, "request", void 0);
exports.RequestPhotos = RequestPhotos = __decorate([
    (0, typeorm_1.Entity)()
], RequestPhotos);
//# sourceMappingURL=request-photos.entity.js.map