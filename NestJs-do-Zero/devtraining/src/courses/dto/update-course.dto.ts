import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto--no-spec';

// @nest/mapped-types
export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
