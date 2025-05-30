"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModule = void 0;
const common_1 = require("@nestjs/common");
const job_service_1 = require("./job.service");
const job_controller_1 = require("./job.controller");
const typeorm_1 = require("@nestjs/typeorm");
const job_entity_1 = require("./entities/job.entity");
const job_photos_entity_1 = require("./entities/job_photos.entity");
let JobModule = class JobModule {
};
exports.JobModule = JobModule;
exports.JobModule = JobModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([job_entity_1.Job, job_photos_entity_1.JobPhotos])],
        controllers: [job_controller_1.JobsController],
        providers: [job_service_1.JobService],
        exports: [typeorm_1.TypeOrmModule, job_service_1.JobService],
    })
], JobModule);
//# sourceMappingURL=job.module.js.map