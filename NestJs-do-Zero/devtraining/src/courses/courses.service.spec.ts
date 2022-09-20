import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
});

describe('CoursesService', () => {
  let service: CoursesService;
  let coursesRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(Course),
          useValue: createMockRepository(),
        },
        { provide: getRepositoryToken(Tag), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    coursesRepository = module.get<MockRepository>(getRepositoryToken(Course));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find One', () => {
    describe('buscar o curso pelo ID', () => {
      it('deve retornar o objeto course', async () => {
        const courseId = '1';
        const expectCourse = {};

        coursesRepository.findOne.mockReturnValue(expectCourse);

        const course = await service.findOne(courseId);

        expect(course).toEqual(expectCourse);
      });

      it('deve retornar NotFoundException', () => {
        expect(service).toBeDefined();
      });
    });
  });
});
