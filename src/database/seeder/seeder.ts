import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(SeederModule);
  const seeder = await app.get(SeederService);
  await seeder.seed();
  await seeder.closeConnection();
  await app.close();
}
bootstrap();
