import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversityService } from './university.service';
import { UniversityController } from './university.controller';
import { UniversitySchema } from 'src/models/university.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'university',
        schema: UniversitySchema
      }
    ]),
  ],
  controllers: [UniversityController],
  providers: [UniversityService]
})
export class UniversityModule {}
