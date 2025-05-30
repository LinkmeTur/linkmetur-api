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
exports.Contact = void 0;
const corporation_entity_1 = require("../../corporations/entities/corporation.entity");
const baseEntity_1 = require("../../database/entities/baseEntity");
const typeorm_1 = require("typeorm");
let Contact = class Contact extends baseEntity_1.BaseEntity {
    corporationID;
    contactID;
    saved_contact;
    favorited_contact;
    corporation;
    contato;
};
exports.Contact = Contact;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contact.prototype, "corporationID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contact.prototype, "contactID", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Contact.prototype, "saved_contact", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Contact.prototype, "favorited_contact", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => corporation_entity_1.Corporation, (corp) => corp.contatos),
    __metadata("design:type", corporation_entity_1.Corporation)
], Contact.prototype, "corporation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => corporation_entity_1.Corporation),
    __metadata("design:type", corporation_entity_1.Corporation)
], Contact.prototype, "contato", void 0);
exports.Contact = Contact = __decorate([
    (0, typeorm_1.Entity)()
], Contact);
//# sourceMappingURL=contact.entity.js.map