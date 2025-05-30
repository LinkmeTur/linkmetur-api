"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalModule = void 0;
const common_1 = require("@nestjs/common");
const proposal_service_1 = require("./proposal.service");
const proposal_controller_1 = require("./proposal.controller");
const typeorm_1 = require("@nestjs/typeorm");
const proposal_entity_1 = require("./entities/proposal.entity");
const proposal_photos_entity_1 = require("./entities/proposal-photos.entity");
let ProposalModule = class ProposalModule {
};
exports.ProposalModule = ProposalModule;
exports.ProposalModule = ProposalModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([proposal_entity_1.Proposal, proposal_photos_entity_1.ProposalPhotos])],
        controllers: [proposal_controller_1.ProposalController],
        providers: [proposal_service_1.ProposalService],
        exports: [typeorm_1.TypeOrmModule, proposal_service_1.ProposalService],
    })
], ProposalModule);
//# sourceMappingURL=proposal.module.js.map