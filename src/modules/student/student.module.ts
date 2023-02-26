import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from 'src/models/student.model';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'student',
        schema: StudentSchema
      }
    ])
  ],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule { }
