"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestForProposalModule = void 0;
const common_1 = require("@nestjs/common");
const request_for_proposal_service_1 = require("./request-for-proposal.service");
const request_for_proposal_controller_1 = require("./request-for-proposal.controller");
const typeorm_1 = require("@nestjs/typeorm");
const request_for_proposal_entity_1 = require("./entities/request-for-proposal.entity");
const request_photos_entity_1 = require("./entities/request-photos.entity");
let RequestForProposalModule = class RequestForProposalModule {
};
exports.RequestForProposalModule = RequestForProposalModule;
exports.RequestForProposalModule = RequestForProposalModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([request_for_proposal_entity_1.RequestForProposal, request_photos_entity_1.RequestPhotos])],
        controllers: [request_for_proposal_controller_1.RequestForProposalController],
        providers: [request_for_proposal_service_1.RequestForProposalService],
        exports: [typeorm_1.TypeOrmModule, request_for_proposal_service_1.RequestForProposalService],
    })
], RequestForProposalModule);
//# sourceMappingURL=request-for-proposal.module.js.map