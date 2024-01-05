import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
  // app.use('', express.static(path.join(__dirname, '..', '..', '..', '..', 'frontend', 'dist', 'forum-app')));
  app.enableCors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        connectSrc: ["'self'", '*.googleapis.com', '157.230.108.218'],
        imgSrc: ["'self'", '*.googleapis.com'],
        scriptSrcElem: ["'self'", 'apis.google.com'],
        frameSrc: ["'self'", '*.firebaseapp.com']
      }
    },
    crossOriginOpenerPolicy: false // for sign in pop up to work
  }))
  app.use((req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "cross-origin")
    next()
  })
  await app.listen(3000);
}
bootstrap();
