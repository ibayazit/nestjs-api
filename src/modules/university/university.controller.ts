import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UniversityService } from './university.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { Schema } from 'mongoose';

@Controller('universities')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUniversityDto: CreateUniversityDto) {
    return this.universityService.create(createUniversityDto);
  }

  @Get()
  findAll() {
    return this.universityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Schema.Types.ObjectId) {
    return this.universityService.findOne(id);
  }

  @Get(':id/students')
  students(@Param('id') id: Schema.Types.ObjectId) {
    return this.universityService.students(id);
  }

  @Patch(':id')
  @HttpCode(202)
  update(@Param('id') id: Schema.Types.ObjectId, @Body() updateUniversityDto: UpdateUniversityDto) {
    return this.universityService.update(id, updateUniversityDto);
  }

  @Delete(':id')
  @HttpCode(202)
  remove(@Param('id') id: Schema.Types.ObjectId) {
    return this.universityService.remove(id);
  }
}
