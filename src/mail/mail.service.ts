// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

interface SendOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get('MAIL_PORT'),
      secure: false, // true para 465
      auth: {
        user: this.configService.get('GMAIL_USER'),
        pass: this.configService.get('GMAIL_PASS'),
      },
    });
  }

  async send(options: SendOptions): Promise<void> {
    await this.transporter.sendMail({
      from: this.configService.get('MAIL_FROM', 'no-reply@linkme.com'),
      ...options,
    });
  }

  async sendPasswordReset(email: string, token: string): Promise<void> {
    const resetLink = `${this.configService.get('APP_URL')}/reset?token=${token}`;
    await this.send({
      to: email,
      subject: 'Recuperação de senha - LinkMe',
      html: `
        <h2>Recuperação de senha</h2>
        <p>Clique no link abaixo para redefinir sua senha:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>Este link expira em 15 minutos.</p>
      `,
    });
  }

  async sendVerificationEmail(email: string, userId: string): Promise<void> {
    const verifyLink = `${this.configService.get('APP_URL')}/verify?userId=${userId}`;
    await this.send({
      to: email,
      subject: 'Verifique seu email - LinkMe',
      html: `
        <h2>Bem-vindo ao LinkMe!</h2>
        <p>Por favor, verifique seu email clicando no link abaixo:</p>
        <a href="${verifyLink}" target="_blank">Verificar email</a>
      `,
    });
  }
}
