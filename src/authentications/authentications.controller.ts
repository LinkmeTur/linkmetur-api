import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Enable2FADto } from './dto/enable-2fa.dto';
import { User } from '../users/entities/user.entity';
import { AuthenticationsService } from './authentications.service';
import { JwtAuthGuard } from './sevices/jwt-guard.guad';
import { CurrentUser } from './sevices/current-user.decorator';
import { SignupDto } from './dto/signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthenticationsController {
  constructor(private readonly authService: AuthenticationsService) {}

  // 🔐 LOGIN
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: { example: { access_token: '...', refresh_token: '...' } },
  })
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  // 📧 RECUPERAÇÃO DE SENHA
  @Post('request-reset')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: { properties: { email: { type: 'string', format: 'email' } } },
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async requestPasswordReset(@Body('email') email: string) {
    await this.authService.requestPasswordReset(email);
  }

  // 🔁 RESETAR SENHA
  @Post('reset')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      properties: { token: { type: 'string' }, novaSenha: { type: 'string' } },
    },
  })
  async resetPassword(
    @Body('token') token: string,
    @Body('novaSenha') novaSenha: string,
  ) {
    await this.authService.resetPassword(token, novaSenha);
  }

  // 🔐 ATIVAR/DESATIVAR 2FA
  @UseGuards(JwtAuthGuard)
  @Post('2fa')
  @ApiBearerAuth()
  @ApiBody({ type: Enable2FADto })
  async toggle2FA(@CurrentUser() user: User, @Body() dto: Enable2FADto) {
    return await this.authService.toggle2FA(user.id, dto.ativar);
  }

  // 🔐 VERIFICAR 2FA
  @UseGuards(JwtAuthGuard)
  @Post('2fa/verify')
  @ApiBearerAuth()
  @ApiBody({
    schema: { properties: { codigo: { type: 'string', example: '123456' } } },
  })
  async verify2FA(@CurrentUser() user: User, @Body('codigo') codigo: string) {
    const valido = await this.authService.verificar2FA(user.id, codigo);
    if (!valido) throw new NotFoundException('Código inválido ou expirado');
    return { success: true };
  }

  // 🔍 PERFIL
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@CurrentUser() user: User) {
    return user;
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuário criado com sucesso',
  })
  async signup(@Body() dto: SignupDto) {
    // Define nível padrão (ex: usuário comum)
    const userDto = { ...dto, nivel: 1 };

    const user = await this.usersService.create(userDto);

    // Gera token de verificação
    await this.authRepo.update(user.id, { email_verificado: false });

    // Envia email de verificação
    await this.mailService.sendVerificationEmail(user.email, user.id);

    return { message: 'Usuário criado. Verifique seu email.' };
  }

  @Get('verify-email')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Query('userId') userId: string) {
    const auth = await this.authRepo.findOne({ where: { user_id: userId } });
    if (!auth) throw new NotFoundException('Usuário não encontrado');

    auth.email_verificado = true;
    await this.authRepo.save(auth);

    return { message: 'Email verificado com sucesso!' };
  }
}
