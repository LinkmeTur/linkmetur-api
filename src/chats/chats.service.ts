// src/chat/chat.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { User } from '../users/entities/user.entity';
import { Request } from '../request/entities/request.entity';
import { RequestForProposal } from '../request-for-proposal/entities/request-for-proposal.entity';
import { Job } from '../job/entities/job.entity';
import * as crypto from 'node:crypto';
import * as fs from 'fs';

@Injectable()
export class ChatService {
  private readonly chave: Buffer;

  constructor(
    @InjectRepository(Chat)
    private readonly chatRepo: Repository<Chat>,
    @InjectRepository(Request)
    private readonly requestRepo: Repository<Request>,
    @InjectRepository(RequestForProposal)
    private readonly rfpRepo: Repository<RequestForProposal>,
    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>,
  ) {
    try {
      this.chave = fs.readFileSync('chave-secreta.key');
      if (this.chave.length !== 32) {
        throw new Error('A chave deve ter 32 bytes (256 bits)');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Erro ao carregar chave de criptografia: ${error.message}`,
        );
      }
      throw new Error('Erro desconhecido ao carregar chave de criptografia.');
    }
  }

  /**
   * Criptografa uma mensagem
   */
  private crypt(message: string): { encrypted: Buffer; iv: Buffer } {
    const iv = crypto.randomBytes(16); // 16 bytes para AES-CBC
    const cipher = crypto.createCipheriv('aes-256-cbc', this.chave, iv);
    const encrypted = Buffer.concat([
      cipher.update(message, 'utf8'),
      cipher.final(),
    ]);
    return { encrypted, iv };
  }

  /**
   * Descriptografa uma mensagem
   */
  private decrypt(encrypted: Buffer, iv: Buffer): string {
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.chave, iv);
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);
    return decrypted.toString('utf8');
  }

  /**
   * Envia uma mensagem criptografada
   */
  async sendMessage(dto: CreateChatDto, remetente: User): Promise<Chat> {
    // Valida destinatário
    const destinatario = await this.chatRepo.manager
      .getRepository(User)
      .findOne({ where: { id: dto.destinatario_id } });

    if (!destinatario) {
      throw new NotFoundException(`Destinatário não encontrado.`);
    }

    let request: Request | null = null;
    let rfp: RequestForProposal | null = null;
    let job: Job | null = null;

    // Valida contexto
    if (dto.request_id) {
      request = await this.requestRepo.findOne({
        where: { id: dto.request_id },
        relations: ['corporation', 'prestador'],
      });
      if (
        !request ||
        (request.corp_id !== remetente.corp_id &&
          request.user_id !== remetente.corp_id)
      ) {
        throw new ForbiddenException(`Acesso negado ao contexto do Request.`);
      }
    }

    if (dto.rfp_id) {
      rfp = await this.rfpRepo.findOne({
        where: { id: dto.rfp_id },
        relations: ['corporation', 'prestador'],
      });
      if (
        !rfp ||
        (rfp.corp_id !== remetente.corp_id &&
          rfp.prestador_id !== remetente.corp_id)
      ) {
        throw new ForbiddenException(`Acesso negado ao contexto do RFP.`);
      }
    }

    if (dto.job_id) {
      job = await this.jobRepo.findOne({ where: { id: dto.job_id } });
      if (!job || job.corp_id !== remetente.corp_id) {
        throw new ForbiddenException(`Acesso negado ao contexto do Job.`);
      }
    }

    let encryptedContent: Buffer | null = null;
    let iv: Buffer | null = null;

    if (dto.conteudo) {
      const { encrypted, iv: genIv } = this.crypt(dto.conteudo);
      encryptedContent = encrypted;
      iv = genIv;
    }
    if (!iv) {
      throw new ForbiddenException(`Mensagem inválida.`);
    }
    const chat = this.chatRepo.create({
      remetente_id: remetente.corp_id,
      destinatario_id: dto.destinatario_id,
      request_id: dto.request_id,
      rfp_id: dto.rfp_id,
      job_id: dto.job_id,
      conteudo: encryptedContent?.toString('base64'),
      photo_url: dto.photo_url,
      photo_alt: dto.photo_alt,
      iv: iv,
      lida: false,
      request,
      rfp,
      job,
    });

    return await this.chatRepo.save(chat);
  }

  /**
   * Busca conversa e descriptografa mensagens
   */
  async getConversationWith(
    otherUserId: string,
    contextId: string,
    contextType: 'request' | 'rfp' | 'job',
    user: User,
  ): Promise<any[]> {
    const qb = this.chatRepo
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.remetente', 'remetente')
      .leftJoinAndSelect('chat.destinatario', 'destinatario')
      .where(
        `(chat.remetente_id = :userId AND chat.destinatario_id = :otherId) OR
         (chat.remetente_id = :otherId AND chat.destinatario_id = :userId)`,
        { userId: user.id, otherId: otherUserId },
      )
      .orderBy('chat.created_at', 'ASC');

    if (contextType === 'request') {
      const request = await this.requestRepo.findOne({
        where: { id: contextId },
      });
      if (
        !request ||
        (request.corp_id !== user.corp_id && request.user_id !== user.corp_id)
      ) {
        throw new ForbiddenException('Acesso negado ao contexto.');
      }
      qb.andWhere('chat.request_id = :contextId', { contextId });
    } else if (contextType === 'rfp') {
      const rfp = await this.rfpRepo.findOne({ where: { id: contextId } });
      if (
        !rfp ||
        (rfp.corp_id !== user.corp_id && rfp.prestador_id !== user.corp_id)
      ) {
        throw new ForbiddenException('Acesso negado ao contexto.');
      }
      qb.andWhere('chat.rfp_id = :contextId', { contextId });
    } else if (contextType === 'job') {
      const job = await this.jobRepo.findOne({ where: { id: contextId } });
      if (!job || job.corp_id !== user.corp_id) {
        throw new ForbiddenException('Acesso negado ao contexto.');
      }
      qb.andWhere('chat.job_id = :contextId', { contextId });
    }

    const messages = await qb.getMany();

    // Descriptografa mensagens
    return messages.map((msg) => {
      let decryptedContent = msg.conteudo;
      if (msg.conteudo && msg.iv) {
        try {
          const encryptedBuffer = Buffer.from(msg.conteudo, 'base64');
          decryptedContent = this.decrypt(encryptedBuffer, msg.iv);
        } catch {
          decryptedContent = '[Erro ao descriptografar]';
        }
      }

      return {
        id: msg.id,
        remetente_id: msg.remetente_id,
        destinatario_id: msg.destinatario_id,
        request_id: msg.request_id,
        rfp_id: msg.rfp_id,
        job_id: msg.job_id,
        conteudo: decryptedContent,
        photo_url: msg.photo_url,
        photo_alt: msg.photo_alt,
        lida: msg.lida,
        created_at: msg.created_at,
        updated_at: msg.updated_at,
      };
    });
  }

  /**
   * Marca mensagens como lidas
   */
  async markAsRead(conversationWith: string, user: User): Promise<void> {
    await this.chatRepo.update(
      {
        destinatario_id: user.id,
        remetente_id: conversationWith,
        lida: false,
      },
      { lida: true },
    );
  }

  /**
   * Lista conversas ativas com última mensagem e contagem de não lidas
   */
  async getActiveConversations(user: User): Promise<
    {
      userId: string;
      lastMessage: string;
      timestamp: Date;
      unreadCount: number;
      context: {
        request_id: string;
        rfp_id: string;
        job_id: string;
      };
    }[]
  > {
    const results = await this.chatRepo
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.remetente', 'remetente')
      .leftJoinAndSelect('chat.destinatario', 'destinatario')
      .where(
        '(chat.remetente_id = :userId OR chat.destinatario_id = :userId)',
        { userId: user.id },
      )
      .orderBy('chat.created_at', 'DESC')
      .getRawAndEntities();

    const conversations = new Map<
      string,
      {
        userId: string;
        lastMessage: string;
        timestamp: Date;
        unreadCount: number;
        context: { request_id: string; rfp_id: string; job_id: string };
      }
    >();

    for (const chat of results.entities) {
      const otherId =
        chat.remetente_id === user.id
          ? chat.destinatario_id
          : chat.remetente_id;
      if (!conversations.has(otherId)) {
        let lastContent = chat.conteudo ? '[Mensagem]' : '[Foto]';
        if (chat.conteudo && chat.iv) {
          try {
            const encrypted = Buffer.from(chat.conteudo, 'base64');
            lastContent = this.decrypt(encrypted, chat.iv).substring(0, 50);
          } catch {
            lastContent = '[Mensagem segura]';
          }
        }

        conversations.set(otherId, {
          userId: otherId,
          lastMessage: lastContent,
          timestamp: chat.created_at,
          unreadCount: 0,
          context: {
            request_id: chat.request_id,
            rfp_id: chat.rfp_id,
            job_id: chat.job_id,
          },
        });
      }
      if (!chat.lida && chat.destinatario_id === user.id) {
        const conversation = conversations.get(otherId);
        if (conversation) {
          conversation.unreadCount++;
        }
      }
    }

    return Array.from(conversations.values());
  }

  async getUnreadCount(id: string) {
    return await this.chatRepo.count({
      where: { destinatario_id: id, lida: false },
    });
  }
}
