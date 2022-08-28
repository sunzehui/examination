import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('在线考试系统')
    .setDescription('The exam API description')
    .setVersion('1.0')
    .addTag('exam system')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  // app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);
  const mode = configService.get('NODE_ENV');
  mode === 'dev' ? app.setGlobalPrefix('api') : '';
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log('server running at http://localhost:3000');
  console.log('swagger doc at http://localhost:3000/doc');
}

bootstrap();
