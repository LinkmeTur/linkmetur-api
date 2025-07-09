import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));

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
  app.enableCors();
  await app.listen(parseInt(process.env.PORT ?? '8081'), '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
