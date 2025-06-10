import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
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
    private readonly httpService: HttpService,
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
          user: 'jamerson@linkmetur.com.br', // Altere para seu email
          pass: 'fepl vvog oicg naaj', // Altere para sua senha (ou token de aplicação seguro)
        },
      });

      const mailOptions = {
        from: 'jamerson@linkmetur.com.br',
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
}
