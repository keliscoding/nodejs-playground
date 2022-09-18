import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto--no-spec';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Post()
  // se passar property no body vc pega um valor especifico ex: @Body('name')
  // @HttpCode(HttpStatus.NO_CONTENT)
  create(@Body() createCourseDTO: CreateCourseDto) {
    this.coursesService.create(createCourseDTO);
    return createCourseDTO;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
