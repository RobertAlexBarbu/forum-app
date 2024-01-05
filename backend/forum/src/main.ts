import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('', express.static(path.join(__dirname, '..', '..', '..', '..', 'frontend', 'dist', 'forum-app')));
  app.enableCors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
