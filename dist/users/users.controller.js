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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_entity_1 = require("./entities/user.entity");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    findAll() {
        return this.usersService.findAll();
    }
    findOne(id) {
        return this.usersService.findOne(id);
    }
    update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    updateOne(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    remove(id) {
        return this.usersService.remove(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Cria um novo usuário' }),
    (0, swagger_1.ApiBody)({
        description: 'Dados necessários para criar um usuário',
        type: create_user_dto_1.CreateUserDto,
        examples: {
            exemplo1: {
                value: {
                    nome: ' string',
                    email: 'string',
                    senha: 'string',
                    telefone: 'string',
                    nivel: 'number',
                    corpId: 'string',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Usuário criado com sucesso',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos ou ausentes' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todos os usuários' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de usuários retornada com sucesso',
        type: [user_entity_1.User],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtém um usuário pelo ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'ID do usuário',
        example: '12345',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuário encontrado', type: user_entity_1.User }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuário não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza um usuário pelo ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'ID do usuário',
        example: '12345',
    }),
    (0, swagger_1.ApiBody)({
        description: 'Dados para atualização do usuário',
        type: update_user_dto_1.UpdateUserDto,
        examples: {
            exemplo1: {
                value: {
                    name: 'Jamerson Silva atualizado',
                    email: 'jamerson_novo@email.com',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuário atualizado com sucesso',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos ou ausentes' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuário não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza parcialmente um usuário' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'ID do usuário',
        example: '12345',
    }),
    (0, swagger_1.ApiBody)({
        description: 'Dados para atualização do usuário',
        type: update_user_dto_1.UpdateUserDto,
        examples: {
            exemplo1: {
                value: {
                    name: 'Jamerson Silva atualizado',
                    email: 'jamerson_novo@email.com',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuário atualizado parcialmente',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos ou ausentes' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuário não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove um usuário pelo ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'ID do usuário',
        example: '12345',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuário removido com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuário não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map