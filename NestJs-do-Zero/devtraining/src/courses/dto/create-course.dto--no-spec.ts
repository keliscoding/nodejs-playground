import { IsString } from 'class-validator';

//nest g class courses/dto/create-course.dto --no-spec
export class CreateCourseDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly description: string;
  @IsString({ each: true })
  readonly tags: string[];
}
