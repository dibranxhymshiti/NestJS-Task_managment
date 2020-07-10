import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('Task management')
    .setDescription('TaskManagement api')
    .setVersion('1.0')
    .addTag('Task')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);


  await app.listen(3000);
}

bootstrap();
