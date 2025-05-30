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
exports.ChatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chat_entity_1 = require("./entities/chat.entity");
const typeorm_2 = require("typeorm");
const crypto = require("crypto");
const fs = require("fs");
let ChatsService = class ChatsService {
    chatRepository;
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
    }
    crypted(message) {
        const chave = fs.readFileSync('chave-secreta.key');
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', chave, iv);
        const encrypted = Buffer.concat([
            cipher.update(message, 'utf8'),
            cipher.final(),
        ]);
        return { encrypted, iv };
    }
    decryted(message, iv) {
        const chave = fs.readFileSync('chave-secreta.key');
        const decipher = crypto.createDecipheriv('aes-256-cbc', chave, iv);
        const decrypted = Buffer.concat([
            decipher.update(message),
            decipher.final(),
        ]);
        return decrypted.toString('utf8');
    }
    async create(createChatDto) {
        const { conteudo } = createChatDto;
        const encrypted = this.crypted(conteudo);
        const message = {
            ...createChatDto,
            conteudo: encrypted.encrypted,
            iv: encrypted.iv,
        };
        const newMessage = this.chatRepository.create(message);
        return this.chatRepository.save(newMessage);
    }
    findAll() {
        return `This action returns all chats`;
    }
    findOne(id) {
        return `This action returns a #${id} chat`;
    }
    async findHistory(remetenteId, destinatarioId) {
        const messageList = await this.chatRepository.find({
            where: [
                { remetenteID: remetenteId, destinatarioID: destinatarioId },
                { remetenteID: destinatarioId, destinatarioID: remetenteId },
            ],
            order: { created_at: 'ASC' },
        });
        const chatListM = messageList.map((element) => {
            const decrypt = this.decryted(element.conteudo, element.iv);
            const { iv, ...read } = element;
            if (iv) {
                return { ...read, conteudo: decrypt };
            }
        });
        return chatListM;
    }
    update(id, updateChatDto) {
        return `This action updates a #${id} chat${updateChatDto.conteudo}`;
    }
    remove(id) {
        return `This action removes a #${id} chat`;
    }
};
exports.ChatsService = ChatsService;
exports.ChatsService = ChatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chat_entity_1.Chat)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChatsService);
//# sourceMappingURL=chats.service.js.map