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
exports.CorporationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const corporation_entity_1 = require("./entities/corporation.entity");
const rxjs_1 = require("rxjs");
const axios_1 = require("@nestjs/axios");
let CorporationsService = class CorporationsService {
    corporationRepository;
    httpService;
    constructor(corporationRepository, httpService) {
        this.corporationRepository = corporationRepository;
        this.httpService = httpService;
    }
    async create(createCorporationDto) {
        const corporation = this.corporationRepository.create(createCorporationDto);
        return await this.corporationRepository.save(corporation);
    }
    async findAll() {
        return await this.corporationRepository.find();
    }
    async findOne(id) {
        const corp = await this.corporationRepository.findOne({
            where: { id: id },
            relations: {
                users: true,
            },
        });
        if (!corp) {
            return `Is Corporation ${id} not found!`;
        }
        return corp;
    }
    async update(id, updateCorporationDto) {
        await this.corporationRepository.update(id, updateCorporationDto);
        return this.findOne(id);
    }
    async remove(id) {
        return await this.corporationRepository.delete(id);
    }
    async consultaCNPJ(cnpj) {
        try {
            const reponse = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://publica.cnpj.ws/cnpj/${cnpj}`));
            return reponse.data;
        }
        catch (error) {
            if (error) {
                throw new common_1.HttpException('Erro ao consultar CNPJ', common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async consultaCep(cep) {
        try {
            const reponse = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://brasilapi.com.br/api/cep/v2/${cep}`));
            return reponse.data;
        }
        catch (error) {
            if (error) {
                throw new common_1.HttpException('Erro ao consultar Cep', common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
};
exports.CorporationsService = CorporationsService;
exports.CorporationsService = CorporationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(corporation_entity_1.Corporation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService])
], CorporationsService);
//# sourceMappingURL=corporations.service.js.map