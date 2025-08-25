import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Authentication } from './entities/authentication.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'node:crypto';
@Injectable()
export class AuthenticationsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(Authentication)
    private readonly authRepo: Repository<Authentication>,
  ) {}

  async login(
    loginDto: LoginDto,
  ): Promise<{ user: User; access_token: string; refresh_token: string }> {
    const user = await this.validateUser(loginDto.email, loginDto.senha);
    const auth = await this.authRepo.findOne({ where: { user_id: user.id } });
    if (!auth) {
      throw new UnauthorizedException('Perfil de autenticação não encontrado.');
    }
    // Aqui você deveria verificar a senha (hash) com bcrypt
    const payload = { email: user.email, sub: user.id };
    return {
      user,
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
  async validateUser(email: string, senha: string): Promise<User> {
    try {
      const user = await this.usersService.findByEmail(email);
      const isMatch = await bcrypt.compare(senha, user.hash_senha);
      if (!isMatch) throw new UnauthorizedException('Credenciais inválidas');
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException('Credenciais inválidas');
      }
      throw error;
    }
  }

  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);
    const token = randomBytes(32).toString('hex');
    const expiraEm = new Date();
    expiraEm.setMinutes(expiraEm.getMinutes() + 15);

    await this.authRepo.update(user.id, {
      token_recuperacao: token,
      expiracao_token: expiraEm,
    });

    // Aqui você chama um serviço de email
    console.log(
      `Recuperação de senha: https://seuapp.com/reset?token=${token}`,
    );
  }

  /**
   * Reseta senha com token
   */
  async resetPassword(token: string, novaSenha: string): Promise<void> {
    const auth = await this.authRepo.findOne({
      where: { token_recuperacao: token },
      relations: ['user'],
    });

    if (!auth) {
      throw new UnauthorizedException('Token inválido');
    }

    if (!auth.expiracao_token || new Date() > auth.expiracao_token) {
      throw new UnauthorizedException('Token expirado');
    }

    await this.usersService.update(auth.user.id, { senha: novaSenha });

    await this.authRepo.update(auth.user_id, {
      token_recuperacao: null,
      expiracao_token: null,
    });
  }

  /**
   * Ativa ou desativa 2FA
   */
  async toggle2FA(
    userId: string,
    ativar: boolean,
  ): Promise<{ codigo_2fa?: string }> {
    const auth = await this.authRepo.findOne({ where: { user_id: userId } });
    if (!auth) {
      throw new NotFoundException('Autenticação não encontrada');
    }

    if (ativar && !auth.codigo_2fa) {
      const codigo = this.gerarCodigo2FA();
      const expiraEm = new Date();
      expiraEm.setMinutes(expiraEm.getMinutes() + 10);

      auth.codigo_2fa = codigo;
      auth.expiracao_2fa = expiraEm;
      auth.dois_fatores_ativo = false; // ainda não ativado

      await this.authRepo.save(auth);
      return { codigo_2fa: codigo };
    }

    auth.dois_fatores_ativo = ativar;
    if (!ativar) {
      auth.codigo_2fa = null;
      auth.expiracao_2fa = null;
    }

    await this.authRepo.save(auth);
    return {};
  }

  /**
   * Verifica código 2FA
   */
  async verificar2FA(userId: string, codigo: string): Promise<boolean> {
    const auth = await this.authRepo.findOne({ where: { user_id: userId } });
    if (!auth || !auth.codigo_2fa || !auth.expiracao_2fa) {
      return false;
    }

    const valido =
      codigo === auth.codigo_2fa && new Date() < auth.expiracao_2fa;
    if (valido && !auth.dois_fatores_ativo) {
      auth.dois_fatores_ativo = true;
      await this.authRepo.save(auth);
    }

    return valido;
  }

  private gerarCodigo2FA(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6 dígitos
  }
}
