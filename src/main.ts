/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
    .addBearerAuth()
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documentFactory);
  app.enableCors();
  await app.listen(process.env.PORT ?? 8081);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
