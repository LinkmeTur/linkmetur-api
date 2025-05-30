"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationsModule = void 0;
const common_1 = require("@nestjs/common");
const authentications_service_1 = require("./authentications.service");
const authentications_controller_1 = require("./authentications.controller");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const users_module_1 = require("../users/users.module");
const corporations_module_1 = require("../corporations/corporations.module");
const axios_1 = require("@nestjs/axios");
let AuthenticationsModule = class AuthenticationsModule {
};
exports.AuthenticationsModule = AuthenticationsModule;
exports.AuthenticationsModule = AuthenticationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.SECRET,
            }),
            axios_1.HttpModule,
            users_module_1.UsersModule,
            corporations_module_1.CorporationsModule,
        ],
        controllers: [authentications_controller_1.AuthenticationsController],
        providers: [authentications_service_1.AuthenticationsService],
        exports: [authentications_service_1.AuthenticationsService],
    })
], AuthenticationsModule);
//# sourceMappingURL=authentications.module.js.map