/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/auth/guards/ws-jwt.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';

@Injectable()
export class WsJwtGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    if (context.getType() === 'ws') {
      const client = context.getArgByIndex(0); // socket
      return {
        headers: {
          authorization: `Bearer ${client.handshake.auth?.token}`,
        },
        // Propriedades mínimas esperadas pelo JWT Strategy
        user: null,
      };
    }

    // HTTP (REST)
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest();
    }

    // GraphQL (opcional)
    if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = context.getArgByIndex(1)?.req; // request no contexto GraphQL
      return ctx;
    }

    // Caso padrão
    return context.switchToHttp().getRequest();
  }
}
