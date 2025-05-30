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
exports.CorporationProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const corporation_profile_entity_1 = require("./entities/corporation-profile.entity");
const typeorm_2 = require("typeorm");
let CorporationProfileService = class CorporationProfileService {
    corporationProfileRepository;
    constructor(corporationProfileRepository) {
        this.corporationProfileRepository = corporationProfileRepository;
    }
    async create(createCorporationProfileDto) {
        const response = this.corporationProfileRepository.create(createCorporationProfileDto);
        return await this.corporationProfileRepository.save(response);
    }
    async findAll() {
        return await this.corporationProfileRepository.find();
    }
    async findOne(id) {
        const profile = await this.corporationProfileRepository.findOne({
            where: { id },
        });
        if (!profile) {
            throw new Error('Profile not found!');
        }
        return profile;
    }
    async update(id, updateCorporationProfileDto) {
        return await this.corporationProfileRepository.update(id, updateCorporationProfileDto);
    }
    async remove(id) {
        return await this.corporationProfileRepository.delete(id);
    }
};
exports.CorporationProfileService = CorporationProfileService;
exports.CorporationProfileService = CorporationProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(corporation_profile_entity_1.CorporationProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CorporationProfileService);
//# sourceMappingURL=corporation-profile.service.js.map