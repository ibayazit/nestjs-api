import { Controller, Get, Query } from '@nestjs/common';
import { Student } from 'src/models/student.model';
import { StartExamDto } from './dto/start-exam.dto';
import { ExamService } from './exam.service';

@Controller('startExam')
export class ExamController {
  constructor(private readonly examService: ExamService) { }

  @Get()
  async startExam(@Query() { examDate }: StartExamDto) {
    const students = await this.examService.students();
    const universities = await this.examService.universities();
    const questions = await this.examService.questions(examDate);
    const examResults = this.makeExam(students, questions);

    const test = []
    for (const university of universities) {
      const studentChunk = students.splice(0, 5)
      
      await this.examService.attachStudentsToUniversity(university._id, students);
    }

    return {
      message: 'The exam is over and all students were appointed to their universities',
      test
    }
  }

  private async makeExam(students: Student[], questions: String[]) {
    for (const student of students) {
      const fullName = `${student.name} ${student.surname}`;

      const points = questions.reduce(function (acc, question) {
        return acc + (
          [...new Set(question.replace(/-/g, ' ').match(new RegExp(`[${fullName.replace(/-/g, ' ')}]`, 'g')))].length
        )
      }, 0);

      student.point = points;
    }

    return students;
  }
}