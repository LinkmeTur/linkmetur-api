import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { ReadChatDTO } from './dto/read-chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  crypted(message: string): {
    encrypted: Buffer<ArrayBuffer>;
    iv: Buffer<ArrayBufferLike>;
  } {
    const chave = fs.readFileSync('chave-secreta.key');
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', chave, iv);
    const encrypted = Buffer.concat([
      cipher.update(message, 'utf8'),
      cipher.final(),
    ]);
    return { encrypted, iv };
  }

  decryted(message: Buffer, iv: Buffer): string {
    const chave = fs.readFileSync('chave-secreta.key');
    const decipher = crypto.createDecipheriv('aes-256-cbc', chave, iv);
    const decrypted = Buffer.concat([
      decipher.update(message),
      decipher.final(),
    ]);
    return decrypted.toString('utf8');
  }

  async create(createChatDto: CreateChatDto) {
    const encrypted = this.crypted(createChatDto.conteudo);
    const message = {
      ...createChatDto,
      conteudo: encrypted.encrypted,
      iv: encrypted.iv,
    };
    const newMessage = this.chatRepository.create(message);
    const result = await this.chatRepository.save(newMessage);
    const { iv, conteudo, ...resto } = result;
    const decrypt = this.decryted(conteudo, iv);
    return {
      ...resto,
      conteudo: decrypt,
      iv,
    };
  }

  findAll() {
    return `This action returns all chats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }
  async findHistory(
    remetenteId: string,
    destinatarioId: string,
  ): Promise<(ReadChatDTO | undefined)[]> {
    const messageList = await this.chatRepository.find({
      where: [
        { remetenteId, destinatarioId },
        { destinatarioId, remetenteId },
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

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat${updateChatDto.conteudo}`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
