import { Controller, Get, Param } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Get('hello')
  sayHello(): string {
    return 'Hello!';
  }

  @Get('sayMyName/:name')
  sayMyName(@Param('name') name: string): string {
    return `your name is ${name}`;
  }
}
