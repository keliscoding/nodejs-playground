import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return { id, ...body };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `deletando o curso ${id}`;
  }
}
