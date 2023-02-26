import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { Model, Schema } from 'mongoose';
import { University, UniversityDocument } from 'src/models/university.model';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';

@Injectable()
export class UniversityService {
  constructor(
    @InjectModel('university') private readonly universityModel: Model<UniversityDocument>
  ) { }

  async create(createUniversityDto: CreateUniversityDto): Promise<University> {
    const newUniversity = new this.universityModel(createUniversityDto);

    return newUniversity.save();
  }

  findAll() {
    return this.universityModel.find();
  }

  students(id) {
    return this.universityModel.aggregate([
      {
        '$match': {
          '_id': new ObjectId(id)
        }
      }, {
        '$lookup': {
          'from': 'students', 
          'localField': '_id', 
          'foreignField': 'university_id', 
          'as': 'students'
        }
      }
    ]);
  }

  findOne(id: Schema.Types.ObjectId) {
    return this.universityModel.findById(id);
  }

  async update(id: Schema.Types.ObjectId, updateSudentDto: UpdateUniversityDto): Promise<University> {
    return this.universityModel.findByIdAndUpdate(id, updateSudentDto, {new: true});
  }

  async remove(id: Schema.Types.ObjectId) {
    return this.universityModel.findByIdAndRemove(id)
  }
}
