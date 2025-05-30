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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsController = void 0;
const common_1 = require("@nestjs/common");
const job_service_1 = require("./job.service");
const create_job_dto_1 = require("./dto/create-job.dto");
const update_job_dto_1 = require("./dto/update-job.dto");
let JobsController = class JobsController {
    jobsService;
    constructor(jobsService) {
        this.jobsService = jobsService;
    }
    create(createJobDto) {
        return this.jobsService.create(createJobDto);
    }
    findAll() {
        return this.jobsService.findAll();
    }
    findOne(id) {
        return this.jobsService.findOne(id);
    }
    update(id, updateJobDto) {
        return this.jobsService.update(id, updateJobDto);
    }
    remove(id) {
        return this.jobsService.remove(id);
    }
};
exports.JobsController = JobsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_dto_1.CreateJobDto]),
    __metadata("design:returntype", void 0)
], JobsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], JobsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_job_dto_1.UpdateJobDto]),
    __metadata("design:returntype", void 0)
], JobsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobsController.prototype, "remove", null);
exports.JobsController = JobsController = __decorate([
    (0, common_1.Controller)('jobs'),
    __metadata("design:paramtypes", [job_service_1.JobService])
], JobsController);
//# sourceMappingURL=job.controller.js.map