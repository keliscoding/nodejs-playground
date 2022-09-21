import { NotFoundException } from '@nestjs/common/exceptions';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;
  let id;
  let date;

  beforeEach(async () => {
    service = new CoursesService();
    id = 'bdd9de0d-ab6a-4b65-809f-59f0c054196e';
    date = new Date();
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

      it('deve retornar NotFoundException', async () => {
        const courseId = '1';
        coursesRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(courseId);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual(`Course ID ${courseId} not found`);
        }
      });
    });
  });
});
