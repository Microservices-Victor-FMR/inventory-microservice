import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const context = await NestFactory.createApplicationContext(AppModule);
  const configService = context.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  const NATS_URL = configService.get<string>('NATS_URL');
  context.close();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [NATS_URL],
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
      
    }),
  );
  await app.listen();
}
bootstrap();
