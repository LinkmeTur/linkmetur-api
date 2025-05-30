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
exports.Chat = void 0;
const typeorm_1 = require("typeorm");
const corporation_entity_1 = require("../../corporations/entities/corporation.entity");
const baseEntity_1 = require("../../database/entities/baseEntity");
let Chat = class Chat extends baseEntity_1.BaseEntity {
    remetenteID;
    remetenteNome;
    destinatarioID;
    conteudo;
    iv;
    remetente;
    destinatario;
};
exports.Chat = Chat;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Chat.prototype, "remetenteID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Chat.prototype, "remetenteNome", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Chat.prototype, "destinatarioID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Buffer)
], Chat.prototype, "conteudo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Buffer)
], Chat.prototype, "iv", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => corporation_entity_1.Corporation, (corporation) => corporation.mensagensEnviadas),
    __metadata("design:type", corporation_entity_1.Corporation)
], Chat.prototype, "remetente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => corporation_entity_1.Corporation, (corporation) => corporation.mensagensRecebidas),
    __metadata("design:type", corporation_entity_1.Corporation)
], Chat.prototype, "destinatario", void 0);
exports.Chat = Chat = __decorate([
    (0, typeorm_1.Entity)()
], Chat);
//# sourceMappingURL=chat.entity.js.map