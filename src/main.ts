import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { LanguageInterceptor } from './interceptors/languageHandle.interceptor';
import { AuthGuard } from './guards/auth.guard';
import * as express from 'express';
import { join } from 'path';



const cookieSession = require('cookie-session')


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(
    {
      transform : true , 
      whitelist: true ,
      forbidNonWhitelisted: true
    }
  ));

  // Interceptor لتوحيد رسائل النجاح
  app.useGlobalInterceptors(new ResponseInterceptor());

  // To handle the responce depend on the language
  app.useGlobalInterceptors(new LanguageInterceptor());

  app.useGlobalGuards(new AuthGuard());


  // TO MAKE THE APP USE THE COOKIE SESSIONS
  app.use(cookieSession({
    keys : ['user_token'],
    maxAge : 24 * 60 * 60 * 1000 // 1 day
  }));
  

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
