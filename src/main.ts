import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
  // Remove silenciosamente qualquer dado extra que o usuário enviar e que não esteja no DTO.
  whitelist: true,
  // bloqueia a requisição e dá erro se vier dado extra.
  forbidNonWhitelisted: true,
  // Transforma os dados recebidos no tipo correto.
  transform: true,
  }));
  // o título e a descrição 
  const config = new DocumentBuilder()
    .setTitle('API Jogadores da Copa')
    .setDescription('Sistema de gerenciamento de jogadores de futebol')
    .setVersion('1.0')
    .build();

  // Criando o documento juntando a minha aplicação com as configurações acima.
  const document = SwaggerModule.createDocument(app, config);

  // Dizendo ao NestJS para exibir esse site na rota '/api' para swagger.
  SwaggerModule.setup('api/jogos', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
