import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import externalSources from 'src/utils/external-sources';
import { firstValueFrom, map } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Student, StudentDocument } from 'src/models/student.model';
import { UniversityDocument } from 'src/models/university.model';

@Injectable()
export class ExamService {
    constructor(
        private httpService: HttpService,
        @InjectModel('student') private readonly studentModel: Model<StudentDocument>,
        @InjectModel('university') private readonly universityModel: Model<UniversityDocument>
    ) { }

    async questions(date) {
        const questionsUrl = externalSources.questions + date.replace(/-/g, '/')

        return firstValueFrom(await this.httpService.get(questionsUrl)
            .pipe(
                map(response => response.data.items[0].articles),
                map(data => data.map(row => row.article))
            ));
    }

    async students() {
        return await this.studentModel.find();
    }

    async universities() {
        return await this.universityModel.find();
    }

    async attachStudentsToUniversity(university_id: Schema.Types.ObjectId, students: Student[]){
        await this.studentModel.bulkWrite(
            students.map((student) => ({
                updateOne: {
                    filter: { _id: student._id },
                    update: { $set: {university_id, ...student} },
                    upsert: true
                }
            }))
        )

        return;
    }
}
