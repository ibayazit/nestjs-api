import { Injectable } from '@nestjs/common';
import { Student, StudentDocument } from 'src/models/student.model'
import { Model, Schema } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('student') private readonly studentModel: Model<StudentDocument>
  ) { }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const newStudent = new this.studentModel(createStudentDto);

    return newStudent.save();
  }

  findAll() {
    return this.studentModel.find();
  }

  findOne(id: Schema.Types.ObjectId) {
    return this.studentModel.findById(id);
  }

  async update(id: Schema.Types.ObjectId, updateSudentDto: UpdateStudentDto): Promise<Student> {
    return this.studentModel.findByIdAndUpdate(id, updateSudentDto, {new: true});
  }

  async remove(id: Schema.Types.ObjectId) {
    return this.studentModel.findByIdAndRemove(id)
  }
}
