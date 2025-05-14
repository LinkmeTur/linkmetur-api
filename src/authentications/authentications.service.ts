/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
// import { JwtService } from '@nestjs/jwt';
import * as crypto from 'node:crypto';
import nodemailer from 'nodemailer';
import { firstValueFrom } from 'rxjs';
import { CreateTwoFactorDto } from './dto/create-twofactor.dto';

// import { CorporationsService } from 'src/corporations/corporations.service';
// import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthenticationsService {
  constructor(
    // private jwtService: JwtService,
    // private userService: UsersService,
    // private corporationService: CorporationsService,
    private readonly httpService: HttpService,
  ) {}

  // async signin() {}

  // async register() {}

  async verificationTwoFactorCode({ codeFactor, data }: CreateTwoFactorDto) {
    const code =
      crypto
        .randomBytes(3)
        .toString('hex')
        .toUpperCase()
        .match(/.{1,3}/g)
        ?.join('-') || '';

    try {
      if (codeFactor === 'email') {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'seuemail@gmail.com',
            pass: 'suasenha',
          },
        });
        return await transporter.sendMail({
          from: '"Verificação" <seuemail@gmail.com>',
          to: data,
          subject: 'Seu código de verificação',
          text: `Seu código de verificação é: ${code}`,
        });
      } else {
        const encodedParams = new URLSearchParams();
        encodedParams.set('to', `${data}`);
        encodedParams.set('text', `Seu código de verificação é: ${code}`);

        const response = await firstValueFrom(
          this.httpService.post(
            'https://sms77io.p.rapidapi.com/sms',
            encodedParams,
            {
              headers: {
                'x-rapidapi-key':
                  '93cc7f512cmsh44fc61bd5733686p14f948jsnb8b415635092',
                'x-rapidapi-host': 'sms77io.p.rapidapi.com',
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          ),
        );
        return response;
      }
    } catch (error) {
      if (error) {
        throw new HttpException(
          'Erro ao enviar codigo',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
