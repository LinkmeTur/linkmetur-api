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
exports.JobPhotos = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_1 = require("../../database/entities/baseEntity");
const job_entity_1 = require("./job.entity");
let JobPhotos = class JobPhotos extends baseEntity_1.BaseEntity {
    job_ID;
    photo;
    photo_URL;
    photo_alt;
    job;
};
exports.JobPhotos = JobPhotos;
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], JobPhotos.prototype, "job_ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Buffer)
], JobPhotos.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobPhotos.prototype, "photo_URL", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobPhotos.prototype, "photo_alt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => job_entity_1.Job, (job) => job.photos),
    (0, typeorm_1.JoinColumn)({ name: 'job_ID' }),
    __metadata("design:type", job_entity_1.Job)
], JobPhotos.prototype, "job", void 0);
exports.JobPhotos = JobPhotos = __decorate([
    (0, typeorm_1.Entity)()
], JobPhotos);
//# sourceMappingURL=job_photos.entity.js.map