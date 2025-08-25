import { ConfigService } from '@nestjs/config';
const configService = new ConfigService();
export const jwtConstants = {
  secret:
    configService.get<string>('SECRETJWT') ||
    'seu-segredo-super-secreto-aqui-123456',
};
