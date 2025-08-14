import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 1. Configuração de CORS para permitir apenas origens confiáveis
  app.enableCors({
    origin: ['http://localhost:3000', 'https://app.linkmetur.com.br'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 3. Configura o WebSocket (Socket.IO)
  app.useWebSocketAdapter(new IoAdapter(app));

  // 4. Configuração do Swagger para documentação da API, incluindo autenticação
  const configSwagger = new DocumentBuilder()
    .setTitle('API - Linke Tur')
    .setDescription(
      `A API do Link Me Tur foi desenvolvida para facilitar
       a conexão entre empresas do setor de turismo e prestadores de serviços,
        criando um ecossistema eficiente e integrado. Com funcionalidades 
        robustas e uma estrutura segura, permite que empresas turísticas acessem
         e gerenciem serviços essenciais, otimizando operações e melhorando a 
         experiência dos clientes.`,
    )
    .setVersion('1.0')

    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(parseInt(process.env.PORT ?? '8081'), '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
