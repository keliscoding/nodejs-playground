import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CoursesController } from './courses.controller';
import { courseProviders } from './courses.providers';
import { CoursesService } from './courses.service';

@Module({
  imports: [DatabaseModule], //aqui ficam as entidades mapeadas do modulo
  controllers: [CoursesController],
  providers: [...courseProviders, CoursesService],
})
export class CoursesModule {}
