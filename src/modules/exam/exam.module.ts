import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from 'src/models/student.model';
import { UniversitySchema } from 'src/models/university.model';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: 'student',
        schema: StudentSchema
      }
    ]),
    MongooseModule.forFeature([
      {
        name: 'university',
        schema: UniversitySchema
      }
    ])
  ],
  controllers: [ExamController],
  providers: [ExamService]
})
export class ExamModule {}
