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
exports.CreateCorporationDto = void 0;
const class_validator_1 = require("class-validator");
class CreateCorporationDto {
    cnpj;
    razao_social;
    natureza_juridica;
    nome_fantasia;
    data_inicio_atividade;
    cnae_fiscal_principal;
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
    tipo;
    tags;
    logo_url;
    logo;
}
exports.CreateCorporationDto = CreateCorporationDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'O CNPJ deve ser uma string válida.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O CNPJ é obrigatório.' }),
    __metadata("design:type", String)
], CreateCorporationDto.prototype, "cnpj", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'A razão social deve ser uma string válida.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A razão social é obrigatória.' }),
    __metadata("design:type", String)
], CreateCorporationDto.prototype, "razao_social", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'A natureza jurídica deve ser uma string válida.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A natureza jurídica é obrigatória.' }),
    __metadata("design:type", String)
], CreateCorporationDto.prototype, "natureza_juridica", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O nome fantasia deve ser uma string válida.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCorporationDto.prototype, "nome_fantasia", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'A data de início deve ser uma string válida.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A data de início da atividade é obrigatória.' }),
    __metadata("design:type", String)
], CreateCorporationDto.prototype, "data_inicio_atividade", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O CNAE fiscal deve ser uma string válida.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O CNAE fiscal principal é obrigatório.' }),
    __metadata("design:type", String)
], CreateCorporationDto.prototype, "cnae_fiscal_principal", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O telefone deve ser uma string válida.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O telefone é obrigatório.' }),
    __metadata("design:type", String)
], CreateCorporationDto.prototype, "telefone", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'O e-mail deve ser um endereço válido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O e-mail é obrigatório.' }),
    __metadata("design:type", String)
], CreateCorporationDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O CEP deve ser uma string válida.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O CEP é obrigatório.' }),
    __metadata("design:type", String)
], CreateCorporationDto.prototype, "cep", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O endereço deve ser uma string válida.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O endereço é obrigatório.' }),
    __metadata("design:type", String)
], CreateCorporationDto.prototype, "endereco", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O endereço deve ser uma string válida.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCorporationDto.prototype, "numero", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O endereço deve ser uma string válida.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCorporationDto.prototype, "bairro", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'A cidade deve ser uma string válida.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A cidade é obrigatória.' }),
    __metadata("design:type", String)
], CreateCorporationDto.prototype, "cidade", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O estado deve ser uma string válida.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O estado é obrigatório.' }),
    __metadata("design:type", String)
], CreateCorporationDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O país deve ser uma string válida.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O país é obrigatório.' }),
    __metadata("design:type", String)
], CreateCorporationDto.prototype, "pais", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCorporationDto.prototype, "localizacao", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCorporationDto.prototype, "tipo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCorporationDto.prototype, "tags", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => !o.logo),
    __metadata("design:type", String)
], CreateCorporationDto.prototype, "logo_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => !o.logo_url),
    __metadata("design:type", Buffer)
], CreateCorporationDto.prototype, "logo", void 0);
//# sourceMappingURL=create-corporation.dto.js.map