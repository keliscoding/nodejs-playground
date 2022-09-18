import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Fundamentos do framework NestJS',
      description: 'Fundamentos do framework NestJS',
      tags: ['node.js', 'nestjs', 'javascript'],
    },
    {
      id: 2,
      name: 'Fundamentos do framework Express',
      description: 'Fundamentos do framework Express',
      tags: ['node.js', 'express', 'javascript'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: string) {
    const course = this.courses.find((c) => c.id === Number(id));

    if (!course)
      throw new HttpException(
        `Course ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );

    return course;
  }

  create(createCourseDTO) {
    this.courses.push(createCourseDTO);
  }

  update(id: string, updateCourseDTO) {
    const index = this.courses.findIndex((c) => c.id === Number(id));
    this.courses[index] = updateCourseDTO;
  }

  remove(id: string) {
    const index = this.courses.findIndex((c) => c.id === Number(id));
    if (index >= 0) {
      this.courses.splice(index, 1);
    }
  }
}
