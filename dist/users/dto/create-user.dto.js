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
exports.CreateUserDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const user_role_enum_1 = require("../types/enuns/user-role.enum");
class CreateUserDto {
    nome;
    email;
    senha;
    telefone;
    nivel;
    corpId;
    avatar_url;
    avatar;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome é obrigatório' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email inválido' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Senha é obrigatória' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "senha", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Telefone é obrigatório' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10, { message: 'O telefone deve conter no minimo 10 digitos' }),
    (0, class_validator_1.MaxLength)(13, { message: 'O telefone deve conter no maximo 13 digitos' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "telefone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Nível é obrigatório' }),
    (0, class_validator_1.IsInt)({ message: 'Nível deve ser um número inteiro' }),
    (0, class_validator_1.Min)(1, { message: 'Nível deve ser pelo menos 1' }),
    (0, class_validator_1.Max)(3, { message: 'Nível deve ser no máximo 3' }),
    (0, class_validator_1.IsEnum)(user_role_enum_1.UserRole, {
        message: 'Nível deve ser um dos seguintes: 1 (Admin), 2 (Funcionário), 3 (Visitante)',
    }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "nivel", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "corpId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => !o.avatar),
    __metadata("design:type", String)
], CreateUserDto.prototype, "avatar_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => !o.avatar_url),
    __metadata("design:type", Buffer)
], CreateUserDto.prototype, "avatar", void 0);
//# sourceMappingURL=create-user.dto.js.map