import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'node:crypto';
import { createTransport } from 'nodemailer';
import { CreateTwoFactorDto } from './dto/create-twofactor.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthenticationsService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    // private readonly httpService: HttpService,
  ) {}

  async signin(email: string, senha: string) {
    const user = await this.userService.findOneByEmailAndPass(email, senha);
    if (!user) {
      throw new HttpException(
        'Credenciais inválidas!',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload = { id: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.SECRETJWT,
    });
    console.log(accessToken);
    console.log(user);
    return { usuario: user, token: accessToken };
  }

  async verificationTwoFactorCode({ data }: CreateTwoFactorDto) {
    try {
      const code =
        crypto
          .randomBytes(3)
          .toString('hex')
          .toUpperCase()
          .match(/.{1,3}/g)
          ?.join('-') ?? '';

      const transporter = createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,

        auth: {
          user: process.env.GMAIL_USER, // Altere para seu email
          pass: process.env.GMAIL_PASS, // Altere para sua senha (ou token de aplicação seguro)
        },
      });

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: data,
        subject: 'Seu código de verificação',
        text: `Seu código de verificação é: ${code}`,
      };
      await transporter.sendMail(mailOptions);
      return code;
    } catch (error) {
      if (error) {
        console.error('Erro ao enviar código:', error);

        throw new HttpException(
          'Erro ao enviar codigo',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async recoveryPassword(email: string) {
    try {
      const user = await this.userService.findOneByEmail(email);

      if (!user) {
        throw new Error('Email não encontrado!');
      }
      const code = crypto.randomBytes(12).toString('hex');

      const transporter = createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,

        auth: {
          user: process.env.GMAIL_USER, // Altere para seu email
          pass: process.env.GMAIL_PASS, // Altere para sua senha (ou token de aplicação seguro)
        },
      });

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: user.email,
        subject: '🔐 Redefinição de senha',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; text-align: center; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #007bff;">Recuperação de senha</h2>
            <p style="font-size: 16px; color: #333;">Olá,</p>
            <p style="font-size: 16px; color: #333;">
                Recebemos uma solicitação para redefinir sua senha. Se foi você quem solicitou, clique no botão abaixo para continuar.
            </p>
            <a href="https://app.linkmetur.com.br/recover-pass/${user.id}/${code}${user.created_at.toISOString()}/${user.nome}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 20px; font-size: 16px; text-decoration: none; border-radius: 5px;">
                Redefinir senha
            </a>
            <p style="font-size: 14px; color: #777; margin-top: 10px;">
                Se não foi você quem solicitou a alteração, ignore este e-mail. Sua senha permanecerá segura.  
            </p>
            <hr style="margin: 20px 0;">
            <p style="font-size: 12px; color: #999;">Este é um e-mail automático, por favor, não responda.</p>
        </div>
    `,
      };

      await transporter.sendMail(mailOptions);
      return {
        status: HttpStatus.OK,
        Message: 'Email de recuperação enviado!',
      };
    } catch (error) {
      if (error instanceof Error) {
        return { status: HttpStatus.NOT_FOUND, Message: error.message };
      }
      throw new HttpException('Erro ao enviar codigo', HttpStatus.BAD_REQUEST);
    }
  }
}
