import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoursesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'devtraining',
      autoLoadEntities: true,
      synchronize: false, // isso aqui é só pra ambiente dev
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
