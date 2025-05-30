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
exports.CorporationProfile = void 0;
const corporation_entity_1 = require("../../corporations/entities/corporation.entity");
const baseEntity_1 = require("../../database/entities/baseEntity");
const typeorm_1 = require("typeorm");
let CorporationProfile = class CorporationProfile extends baseEntity_1.BaseEntity {
    corpID;
    descricao;
    corp;
};
exports.CorporationProfile = CorporationProfile;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CorporationProfile.prototype, "corpID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CorporationProfile.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => corporation_entity_1.Corporation, (corp) => corp.profile),
    __metadata("design:type", corporation_entity_1.Corporation)
], CorporationProfile.prototype, "corp", void 0);
exports.CorporationProfile = CorporationProfile = __decorate([
    (0, typeorm_1.Entity)()
], CorporationProfile);
//# sourceMappingURL=corporation-profile.entity.js.map