import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //precisa usar o class-validator e o class-transformer
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //whitelist serve para o obj receber só que ta definido no dto
      forbidNonWhitelisted: true, //vai dar um badrequest avisando que não pode aceitar essa propriedade extra
      transform: true, //transforma a payload com o dto automaticamente
    }),
  ); //serve para validar requisições
  await app.listen(3000);
}
bootstrap();
