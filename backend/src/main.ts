import 'reflect-metadata'
import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({ origin: '*' })
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))

  const config = new DocumentBuilder()
    .setTitle('My Portfolio API')
    .setVersion('1.0')
    .build()
  const doc = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, doc)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
