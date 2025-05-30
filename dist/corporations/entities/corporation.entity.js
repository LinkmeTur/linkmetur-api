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
exports.Corporation = void 0;
const chat_entity_1 = require("../../chats/entities/chat.entity");
const contact_entity_1 = require("../../contacts/entities/contact.entity");
const corporation_profile_entity_1 = require("../../corporation-profile/entities/corporation-profile.entity");
const baseEntity_1 = require("../../database/entities/baseEntity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let Corporation = class Corporation extends baseEntity_1.BaseEntity {
    logo_url;
    logo;
    cnpj;
    razao_social;
    natureza_juridica;
    nome_fantasia;
    data_inicio_atividade;
    cnae_fiscal_principal;
    tipo;
    tags;
    telefone;
    email;
    cep;
    endereco;
    numero;
    bairro;
    cidade;
    estado;
    pais;
    localizacao;
    profile;
    users;
    mensagensEnviadas;
    mensagensRecebidas;
    contatos;
};
exports.Corporation = Corporation;
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Corporation.prototype, "logo_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bytea', nullable: true }),
    __metadata("design:type", Buffer)
], Corporation.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Corporation.prototype, "cnpj", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Corporation.prototype, "razao_social", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Corporation.prototype, "natureza_juridica", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Corporation.prototype, "nome_fantasia", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Corporation.prototype, "data_inicio_atividade", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Corporation.prototype, "cnae_fiscal_principal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Corporation.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Corporation.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Corporation.prototype, "telefone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Corporation.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Corporation.prototype, "cep", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Corporation.prototype, "endereco", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Corporation.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Corporation.prototype, "bairro", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Corporation.prototype, "cidade", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Corporation.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Corporation.prototype, "pais", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Corporation.prototype, "localizacao", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => corporation_profile_entity_1.CorporationProfile, (pro) => pro.corp),
    __metadata("design:type", corporation_profile_entity_1.CorporationProfile)
], Corporation.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.corp),
    __metadata("design:type", Array)
], Corporation.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chat_entity_1.Chat, (chat) => chat.remetente),
    __metadata("design:type", Array)
], Corporation.prototype, "mensagensEnviadas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chat_entity_1.Chat, (chat) => chat.destinatario),
    __metadata("design:type", Array)
], Corporation.prototype, "mensagensRecebidas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contact_entity_1.Contact, (cont) => cont.contato),
    __metadata("design:type", Array)
], Corporation.prototype, "contatos", void 0);
exports.Corporation = Corporation = __decorate([
    (0, typeorm_1.Entity)()
], Corporation);
//# sourceMappingURL=corporation.entity.js.map