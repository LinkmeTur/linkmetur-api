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
exports.CorporationProfileController = void 0;
const common_1 = require("@nestjs/common");
const corporation_profile_service_1 = require("./corporation-profile.service");
const create_corporation_profile_dto_1 = require("./dto/create-corporation-profile.dto");
const update_corporation_profile_dto_1 = require("./dto/update-corporation-profile.dto");
let CorporationProfileController = class CorporationProfileController {
    corporationProfileService;
    constructor(corporationProfileService) {
        this.corporationProfileService = corporationProfileService;
    }
    create(createCorporationProfileDto) {
        return this.corporationProfileService.create(createCorporationProfileDto);
    }
    findAll() {
        return this.corporationProfileService.findAll();
    }
    findOne(id) {
        return this.corporationProfileService.findOne(id);
    }
    update(id, updateCorporationProfileDto) {
        return this.corporationProfileService.update(id, updateCorporationProfileDto);
    }
    remove(id) {
        return this.corporationProfileService.remove(id);
    }
};
exports.CorporationProfileController = CorporationProfileController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_corporation_profile_dto_1.CreateCorporationProfileDto]),
    __metadata("design:returntype", void 0)
], CorporationProfileController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CorporationProfileController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CorporationProfileController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_corporation_profile_dto_1.UpdateCorporationProfileDto]),
    __metadata("design:returntype", void 0)
], CorporationProfileController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CorporationProfileController.prototype, "remove", null);
exports.CorporationProfileController = CorporationProfileController = __decorate([
    (0, common_1.Controller)('corporation-profile'),
    __metadata("design:paramtypes", [corporation_profile_service_1.CorporationProfileService])
], CorporationProfileController);
//# sourceMappingURL=corporation-profile.controller.js.map