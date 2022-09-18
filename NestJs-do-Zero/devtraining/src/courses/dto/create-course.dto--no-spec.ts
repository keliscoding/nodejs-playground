//nest g class courses/dto/create-course.dto --no-spec
export class CreateCourseDto {
  readonly name: string;
  readonly description: string;
  readonly tags: string[];
}
