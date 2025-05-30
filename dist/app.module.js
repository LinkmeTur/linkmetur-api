"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const corporations_module_1 = require("./corporations/corporations.module");
const authentications_module_1 = require("./authentications/authentications.module");
const chats_module_1 = require("./chats/chats.module");
const job_module_1 = require("./job/job.module");
const contacts_module_1 = require("./contacts/contacts.module");
const request_for_proposal_module_1 = require("./request-for-proposal/request-for-proposal.module");
const proposal_module_1 = require("./proposal/proposal.module");
const corporation_profile_module_1 = require("./corporation-profile/corporation-profile.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DATABASE_URL,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                dropSchema: false,
                retryAttempts: 2,
                retryDelay: 100,
            }),
            users_module_1.UsersModule,
            corporations_module_1.CorporationsModule,
            authentications_module_1.AuthenticationsModule,
            job_module_1.JobModule,
            chats_module_1.ChatsModule,
            contacts_module_1.ContactsModule,
            request_for_proposal_module_1.RequestForProposalModule,
            proposal_module_1.ProposalModule,
            corporation_profile_module_1.CorporationProfileModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map