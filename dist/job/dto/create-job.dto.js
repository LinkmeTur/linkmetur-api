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
exports.CreateJobDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const job_photos_entity_1 = require("../entities/job_photos.entity");
class CreateJobDto {
    corp_Id;
    nome_servico;
    categoria;
    sub_categoria;
    descricao;
    min_valor;
    max_valor;
    video_url;
    certificacoes;
    disponibilidade;
    publicado;
    photos;
}
exports.CreateJobDto = CreateJobDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'O corp_Id deve ser uma string válida.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O corp_Id é obrigatório.' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "corp_Id", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O servico deve ser uma string válida.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O servico é obrigatório.' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "nome_servico", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'A categoria deve ser uma string válida.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A categoria é obrigatória.' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "categoria", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'A sub_categoria deve ser uma string válida.' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "sub_categoria", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'A descrição deve ser uma string válida.' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "descricao", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'O valor mínimo deve ser um número.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O valor mínimo é obrigatório.' }),
    __metadata("design:type", Number)
], CreateJobDto.prototype, "min_valor", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'O valor máximo deve ser um número.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O valor máximo é obrigatório.' }),
    __metadata("design:type", Number)
], CreateJobDto.prototype, "max_valor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'A URL do vídeo deve ser uma string válida.' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "video_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'As certificações devem ser uma string válida.' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "certificacoes", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'A disponibilidade deve ser uma string válida.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A disponibilidade é obrigatória.' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "disponibilidade", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: 'O campo publicado deve ser um valor booleano.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O campo publicado é obrigatório.' }),
    __metadata("design:type", Boolean)
], CreateJobDto.prototype, "publicado", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: 'As fotos devem ser um array válido.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => job_photos_entity_1.JobPhotos),
    __metadata("design:type", Array)
], CreateJobDto.prototype, "photos", void 0);
//# sourceMappingURL=create-job.dto.js.map