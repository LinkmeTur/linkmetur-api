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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    userRepository;
    async create(createUserDto) {
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: {
                corp: true,
            },
        });
        if (!user) {
            return 'is not user';
        }
        return user;
    }
    async findOneByEmailAndPass(email, senha) {
        const user = await this.userRepository.findOne({
            where: { email, senha },
            relations: {
                corp: true,
            },
        });
        if (!user) {
            return 'is not user';
        }
        return user;
    }
    async update(id, updateUserDto) {
        return await this.userRepository.update(id, updateUserDto);
    }
    async remove(id) {
        return await this.userRepository.delete(id);
    }
};
exports.UsersService = UsersService;
__decorate([
    (0, typeorm_1.InjectRepository)(user_entity_1.User),
    __metadata("design:type", typeorm_2.Repository)
], UsersService.prototype, "userRepository", void 0);
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map