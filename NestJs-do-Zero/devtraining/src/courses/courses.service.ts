import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto--no-spec';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findAll() {
    return this.courseRepository.find();
  }

  async findOne(id: string) {
    return this.courseRepository.findOneOrFail(id).catch((err) => {
      throw new NotFoundException(`Course ID ${id} not found`);
    });
  }

  async create(createCourseDTO: CreateCourseDto) {
    const course = this.courseRepository.create(createCourseDTO);
    await this.courseRepository.save(course);
  }

  async update(id: string, updateCourseDTO: UpdateCourseDto) {
    const course = await this.courseRepository.preload({
      id: +id,
      ...updateCourseDTO,
    });

    if (!course) {
      throw new NotFoundException(`Course ID ${id} not found`);
    }

    return this.courseRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.courseRepository
      .findOneOrFail(id)
      .catch((err) => {
        throw new NotFoundException(`Course ID ${id} not found`);
      });

    this.courseRepository.remove(course);
  }
}
