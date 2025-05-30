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
exports.User = void 0;
const corporation_entity_1 = require("../../corporations/entities/corporation.entity");
const baseEntity_1 = require("../../database/entities/baseEntity");
const typeorm_1 = require("typeorm");
let User = class User extends baseEntity_1.BaseEntity {
    avatar_url;
    avatar;
    nome;
    email;
    senha;
    telefone;
    nivel;
    corpId;
    corp;
};
exports.User = User;
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatar_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bytea', nullable: true }),
    __metadata("design:type", Buffer)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "senha", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "telefone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "nivel", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "corpId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => corporation_entity_1.Corporation, (corp) => corp.users),
    (0, typeorm_1.JoinColumn)({ name: 'corpId' }),
    __metadata("design:type", corporation_entity_1.Corporation)
], User.prototype, "corp", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map