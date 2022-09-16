import { Controller, Get } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Get('hello')
  sayHello(): string {
    return 'Hello!';
  }
}
