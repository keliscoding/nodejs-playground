import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Get()
  findAll(@Res() response) {
    //isso aqui não é a melhor forma de tratar status nas respostas
    return response.status(200).send('Listagem de cursos');
  }

  @Get('sayMyName/:name')
  sayMyName(@Param('name') name: string): string {
    return `your name is ${name}`;
  }

  @Post()
  //se passar property no body vc pega um valor especifico ex: @Body('name')
  @HttpCode(HttpStatus.NO_CONTENT)
  create(@Body() body) {
    return body;
  }
}
