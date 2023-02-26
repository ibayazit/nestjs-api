import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { StudentService } from './student.service';
import { Schema } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Post()
  @HttpCode(201)
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Schema.Types.ObjectId) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(202)
  async update(@Param('id') id: Schema.Types.ObjectId, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @HttpCode(202)
  async remove(@Param('id') id: Schema.Types.ObjectId) {
    return this.studentService.remove(id);
  }
}
