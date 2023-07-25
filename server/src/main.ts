import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['content-type', 'Authorization'],
    credentials: true,
    origin: '*',
  });

  await app.listen(8080);
}
bootstrap();

console.log(process.env);
