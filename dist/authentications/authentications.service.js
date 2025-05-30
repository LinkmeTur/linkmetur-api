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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const crypto = require("node:crypto");
const nodemailer_1 = require("nodemailer");
const users_service_1 = require("../users/users.service");
let AuthenticationsService = class AuthenticationsService {
    userService;
    httpService;
    constructor(userService, httpService) {
        this.userService = userService;
        this.httpService = httpService;
    }
    async signin(email, senha) {
        const verifiedUser = await this.userService.findOneByEmailAndPass(email, senha);
        if (verifiedUser === typeof String) {
            return { message: 'Access Deined! User not found!' };
        }
        return verifiedUser;
    }
    async verificationTwoFactorCode({ codeFactor, data }) {
        try {
            const code = crypto
                .randomBytes(3)
                .toString('hex')
                .toUpperCase()
                .match(/.{1,3}/g)
                ?.join('-') ?? '';
            const transporter = (0, nodemailer_1.createTransport)({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                auth: {
                    user: 'jamerson@linkmetur.com.br',
                    pass: 'fepl vvog oicg naaj',
                },
            });
            if (codeFactor === 'email') {
                const mailOptions = {
                    from: 'jamerson@linkmetur.com.br',
                    to: data,
                    subject: 'Seu código de verificação',
                    text: `Seu código de verificação é: ${code}`,
                };
                await transporter.sendMail(mailOptions);
                return code;
            }
            return code;
        }
        catch (error) {
            if (error) {
                console.error('Erro ao enviar código:', error);
                throw new common_1.HttpException('Erro ao enviar codigo', common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
};
exports.AuthenticationsService = AuthenticationsService;
exports.AuthenticationsService = AuthenticationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        axios_1.HttpService])
], AuthenticationsService);
//# sourceMappingURL=authentications.service.js.map