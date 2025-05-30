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
exports.AuthenticationsController = void 0;
const common_1 = require("@nestjs/common");
const authentications_service_1 = require("./authentications.service");
const swagger_1 = require("@nestjs/swagger");
const create_twofactor_dto_1 = require("./dto/create-twofactor.dto");
let AuthenticationsController = class AuthenticationsController {
    authenticationsService;
    constructor(authenticationsService) {
        this.authenticationsService = authenticationsService;
    }
    signWithEmailAndPass(data) {
        return this.authenticationsService.signin(data.email, data.senha);
    }
    verificationTwoFactorCode(factor) {
        return this.authenticationsService.verificationTwoFactorCode(factor);
    }
};
exports.AuthenticationsController = AuthenticationsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'login' }),
    (0, swagger_1.ApiBody)({
        description: 'Autenticação de usuário',
        examples: {
            login: {
                value: {
                    email: 'string',
                    senha: 'string',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationsController.prototype, "signWithEmailAndPass", null);
__decorate([
    (0, common_1.Post)('verificationTwoFactorCode'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Cria um novo usuário' }),
    (0, swagger_1.ApiBody)({
        description: 'Two Factor Code Verification',
        type: create_twofactor_dto_1.CreateTwoFactorDto,
        examples: {
            exemplo1: {
                value: {
                    codeFactor: 'string',
                    data: 'string',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_twofactor_dto_1.CreateTwoFactorDto]),
    __metadata("design:returntype", Promise)
], AuthenticationsController.prototype, "verificationTwoFactorCode", null);
exports.AuthenticationsController = AuthenticationsController = __decorate([
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiTags)('authentications'),
    (0, common_1.Controller)('authentications'),
    __metadata("design:paramtypes", [authentications_service_1.AuthenticationsService])
], AuthenticationsController);
//# sourceMappingURL=authentications.controller.js.map