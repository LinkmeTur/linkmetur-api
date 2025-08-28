// src/auth/guards/ws-jwt.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class WsJwtGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = context.getType<GqlContextType>();
    switch (ctx) {
      case 'ws':
        return context.switchToWs().getClient().handshake;
      case 'graphql':
        return GqlExecutionContext.create(context).getContext().req;
      default:
        return context.switchToHttp().getRequest();
    }
  }
}
