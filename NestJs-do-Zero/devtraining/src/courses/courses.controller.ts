import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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

  @Post()
  //se passar property no body vc pega um valor especifico ex: @Body('name')
  create(@Body() body): string {
    return body;
  }
}
