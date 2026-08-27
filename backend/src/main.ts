import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Allow all origins. FRONTEND_ORIGIN is informational/log-only and must
  // NOT be used to restrict CORS.
  app.enableCors({ origin: '*' });

  const port = configService.get<number>('PORT');
  const frontendOrigin = configService.get<string>('FRONTEND_ORIGIN');

  await app.listen(port);

  Logger.log(
    `Application is running on: http://localhost:${port} ` +
      `(expected frontend origin: ${frontendOrigin}, CORS: allow all)`,
    'Bootstrap',
  );
}
bootstrap();
