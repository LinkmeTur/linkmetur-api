// src/auth/guards/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guarda para proteger rotas com JWT
 *
 * Uso:
 * @UseGuards(JwtAuthGuard)
 *
 * Baseado no Passport com estratégia 'jwt'
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
