"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configSwagger = new swagger_1.DocumentBuilder()
        .setTitle('API - Linke Tur')
        .setDescription(`A API do Link Me Tur foi desenvolvida para facilitar
       a conexão entre empresas do setor de turismo e prestadores de serviços,
        criando um ecossistema eficiente e integrado. Com funcionalidades 
        robustas e uma estrutura segura, permite que empresas turísticas acessem
         e gerenciem serviços essenciais, otimizando operações e melhorando a 
         experiência dos clientes.`)
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, configSwagger);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    app.enableCors();
    await app.listen(process.env.PORT ?? 8081);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map