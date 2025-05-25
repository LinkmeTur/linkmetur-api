/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
// import * as venom from 'venom-bot';
// import { JwtService } from '@nestjs/jwt';
import * as crypto from 'node:crypto';
import { createTransport } from 'nodemailer';
// import { firstValueFrom } from 'rxjs';
import { CreateTwoFactorDto } from './dto/create-twofactor.dto';

// import { CorporationsService } from 'src/corporations/corporations.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthenticationsService {
  constructor(
    // private jwtService: JwtService,
    private userService: UsersService,
    // private corporationService: CorporationsService,
    private readonly httpService: HttpService,
  ) {}

  async signin(email: string, senha: string) {
    const verifiedUser = await this.userService.findOneByEmailAndPass(
      email,
      senha,
    );
    if (verifiedUser === typeof String) {
      return { message: 'Access Deined! User not found!' };
    }

    return verifiedUser;
  }

  // async register() {}

  async verificationTwoFactorCode({ codeFactor, data }: CreateTwoFactorDto) {
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

      if (codeFactor === 'email') {
        const mailOptions = {
          from: 'jamerson@linkmetur.com.br',
          to: data,
          subject: 'Seu código de verificação',
          text: `Seu código de verificação é: ${code}`,
        };
        await transporter.sendMail(mailOptions);
        return code;
      }
      //  else {
      //   console.log('code2', code);
      //   const encodedParams = new URLSearchParams();
      //   encodedParams.set('to', `${data}`);
      //   encodedParams.set('text', `Seu código de verificação é: ${code}`);
      //   // eslint-disable-next-line @typescript-eslint/no-require-imports

      //   const zap = await venom.create({
      //     session: 'support',
      //     headless: 'new',
      //   });

      //   await zap.sendText(
      //     data + '@c.us',
      //     `Seu código de verificação é: ${code}`,
      //   );
      //   console.log('zap', zap);
      //   // const response = await firstValueFrom(
      //   //   this.httpService.post(
      //   //     'https://sms77io.p.rapidapi.com/sms',
      //   //     encodedParams,
      //   //     {
      //   //       headers: {
      //   //         'x-rapidapi-key':
      //   //           '93cc7f512cmsh44fc61bd5733686p14f948jsnb8b415635092',
      //   //         'x-rapidapi-host': 'sms77io.p.rapidapi.com',
      //   //         'Content-Type': 'application/x-www-form-urlencoded',
      //   //       },
      //   //     },
      //   //   ),
      //   // );
      //   // console.log(' esponse', response);
      //   // return code;
      // }
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
