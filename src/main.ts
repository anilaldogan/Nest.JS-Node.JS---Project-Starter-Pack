import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(`[${process.pid}] Configuring Proccess`);
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest Test API')
    .setDescription('Nest Test API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const whitelist = [
    'http://localhost:3000',
    'http://localhost:3001',
    undefined, //! For localhost.
  ];
  app.enableCors({
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log('Not allowed by CORS : ', origin);
        throw new HttpException('Not allowed by CORS', HttpStatus.FORBIDDEN);
      }
    },
    methods: 'GET,PUT,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  const port = 5000;
  await app.listen(port);
  console.log(`[${process.pid}] Listening on port ${port}`);
}
bootstrap();
