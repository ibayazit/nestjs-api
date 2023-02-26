import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { firstValueFrom, map } from 'rxjs';
import externalSources from 'src/utils/external-sources';
import { connect, connection, model, Schema, set } from 'mongoose'

@Injectable()
export class SeederService {
    private readonly logger = new Logger(SeederService.name);


    constructor(
        private httpService: HttpService,
    ) {
        set("strictQuery", false);
        connect(process.env.MONGODB_URI);
    }

    async seed() {
        this.logger.log('Seeding process starting');

        this.saveStudents(await this.getStudentsFromExternalSource())
        this.logger.log('Studens seed processed');
        this.saveUniversities(await this.getUniversitiesFromExternalSource())
        this.logger.log('Universities seed processed');

        this.logger.log('Seeding completed');

        return;
    }

    async closeConnection() {
        setTimeout(async () => {
            await connection.close();
        }, 3000);
        this.logger.log('Database connection closed');
    }

    private async getStudentsFromExternalSource() {
        return firstValueFrom(await this.httpService.get(externalSources.randomuser)
            .pipe(
                map(response => response.data.results),
                map(data => data.map(row => ({
                    name: row.name.first,
                    surname: row.name.last,
                    email: row.email
                })))
            ));
    }

    private async getUniversitiesFromExternalSource() {
        return firstValueFrom(await this.httpService.get(externalSources.universities)
            .pipe(
                map(response => response.data),
                map(data => data.map(row => ({
                    title: row.name,
                    domain: row.domains.at(0)
                })))
            ));
    }

    private async saveStudents(students): Promise<void> {
        const studentModel = model('students', new Schema({
            name: String,
            surname: String,
            email: String,
            university_id: Schema.Types.ObjectId,
            point: {
                type: Number,
                default: 0
            },
            created_at: {
                type: Date,
                default: Date.now
            }
        }));

        await studentModel.bulkWrite(
            students.map((student) => ({
                updateOne: {
                    filter: { email: student.email },
                    update: { $set: student },
                    upsert: true
                }
            }))
        )
    }

    private async saveUniversities(universities): Promise<void> {
        const universityModel = model('universities', new Schema({ title: String, domain: String }));

        await universityModel.bulkWrite(
            universities.map((university) => ({
                updateOne: {
                    filter: { domain: university.domain },
                    update: { $set: university },
                    upsert: true
                }
            }))
        )
    }
}