import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //precisa usar o class-validator e o class-transformer
  app.useGlobalPipes(new ValidationPipe()); //serve para validar requisições
  await app.listen(3000);
}
bootstrap();
