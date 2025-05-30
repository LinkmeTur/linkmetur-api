"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorporationProfileModule = void 0;
const common_1 = require("@nestjs/common");
const corporation_profile_service_1 = require("./corporation-profile.service");
const corporation_profile_controller_1 = require("./corporation-profile.controller");
const typeorm_1 = require("@nestjs/typeorm");
const corporation_profile_entity_1 = require("./entities/corporation-profile.entity");
let CorporationProfileModule = class CorporationProfileModule {
};
exports.CorporationProfileModule = CorporationProfileModule;
exports.CorporationProfileModule = CorporationProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([corporation_profile_entity_1.CorporationProfile])],
        controllers: [corporation_profile_controller_1.CorporationProfileController],
        providers: [corporation_profile_service_1.CorporationProfileService],
        exports: [typeorm_1.TypeOrmModule, corporation_profile_service_1.CorporationProfileService],
    })
], CorporationProfileModule);
//# sourceMappingURL=corporation-profile.module.js.map