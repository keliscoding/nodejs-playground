import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CoursesModule } from '../../src/courses/courses.module';

describe('Courses: /courses', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoursesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    app.close;
  });

  it.todo('Create POST /courses');
  it.todo('Create GET /courses');
  it.todo('Create GET /courses/id');
  it.todo('Create PATCH /courses/id');
  it.todo('Create DELETE /courses/id');
});
