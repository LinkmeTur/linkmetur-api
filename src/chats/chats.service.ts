import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  crypted(message: string): Buffer {
    const chave = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', chave, iv);
    const encrypted = Buffer.concat([
      cipher.update(message, 'utf8'),
      cipher.final(),
    ]);
    return encrypted;
  }

  decryted(message: Buffer): string {
    const chave = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const decipher = crypto.createDecipheriv('aes-256-cbc', chave, iv);
    const decrypted = Buffer.concat([
      decipher.update(message),
      decipher.final(),
    ]);
    return decrypted.toString('utf8');
  }

  async create(createChatDto: CreateChatDto) {
    const { conteudo } = createChatDto;
    const encrypted = this.crypted(conteudo);
    const message = { ...createChatDto, conteudo: encrypted };
    const newMessage = this.chatRepository.create(message);
    return this.chatRepository.save(newMessage);
  }

  findAll() {
    return `This action returns all chats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
