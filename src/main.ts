import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as formData from 'express-form-data';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(formData.parse());
  app.enableCors({
    origin: 'http://localhost:3001', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true,   
    transform: true, 
    forbidNonWhitelisted: true,
  }));
  const config = new DocumentBuilder()
    .setTitle('Cure APIs')
    .setDescription('The Cure APIs description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
