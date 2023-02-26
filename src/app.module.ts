import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './modules/student/student.module';
import { UniversityModule } from './modules/university/university.module';
import { ExamModule } from './modules/exam/exam.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    StudentModule,
    UniversityModule,
    ExamModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
