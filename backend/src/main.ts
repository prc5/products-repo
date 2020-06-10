import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { port } from '../config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(port);
}
bootstrap();
