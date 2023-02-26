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
    const examResults = await this.makeExam(students, questions);

    for (const university of universities) {
      const studentChunk = examResults.splice(0, 5).map(student => {
        student.university_id = university._id;

        return student;
      });

      await this.examService.attachStudentsToUniversity(studentChunk);
    }

    return {
      message: 'The exam is over and all students were appointed to their universities'
    }
  }

  private async makeExam(students: Student[], questions: String[]): Promise<Student[]> {
    return await students.map((student) => {
      const fullName = `${student.name} ${student.surname}`;

      student.point = questions.reduce(function (acc, question) {
        return acc + (
          [...new Set(question.replace(/-/g, ' ').match(new RegExp(`[${fullName.replace(/-/g, ' ')}]`, 'gi')))].length
        )
      }, 0);

      return student;
    })
  }
}