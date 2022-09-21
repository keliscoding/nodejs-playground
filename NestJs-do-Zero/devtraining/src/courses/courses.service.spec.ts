import { NotFoundException } from '@nestjs/common/exceptions';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto--no-spec';
import { UpdateCourseDto } from './dto/update-course.dto';

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

  it('should creates a course', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at: date,
      },
    ];
    const expectOutputCourse = {
      id,
      name: 'Test',
      description: 'Test description',
      created_at: date,
      tags: expectOutputTags,
    };
    const mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };
    const mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;
    const createCourseDto: CreateCourseDto = {
      name: 'Test',
      description: 'Test description',
      tags: ['nestjs'],
    };
    const newCourse = await service.create(createCourseDto);
    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourse).toStrictEqual(newCourse);
  });

  it('should list courses', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at: date,
      },
    ];
    const expectOutputCourse = [
      {
        id,
        name: 'Test',
        description: 'Test description',
        created_at: date,
        tags: expectOutputTags,
      },
    ];

    const mockCourseRepository = {
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    const courses = await service.findAll();
    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(expectOutputCourse).toStrictEqual(courses);
  });

  it('should get a course', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at: date,
      },
    ];
    const expectOutputCourse = {
      id,
      name: 'Test',
      description: 'Test description',
      created_at: date,
      tags: expectOutputTags,
    };

    const mockCourseRepository = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    const course = await service.findOne(id);
    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(expectOutputCourse).toStrictEqual(course);
  });

  it('should throw NotFoundException when a course cannot be found', async () => {
    const mockCourseRepository = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(undefined)),
    };
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    try {
      await service.findOne(id);
    } catch (error) {
      expect(mockCourseRepository.findOne).toHaveBeenCalled();
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe(`Course ID ${id} not found`);
    }
  });

  it('should updates a course', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at: date,
      },
    ];
    const expectOutputCourse = {
      id,
      name: 'Test',
      description: 'Test description',
      created_at: date,
      tags: expectOutputTags,
    };
    const mockCourseRepository = {
      //update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };
    const mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;
    const updateCourseDto: UpdateCourseDto = {
      name: 'Test',
      description: 'Test description',
      tags: ['nestjs'],
    };
    const course = await service.update(id, updateCourseDto);
    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourse).toStrictEqual(course);
  });

  it('should throw NotFoundException when trying to update a course', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at: date,
      },
    ];

    const mockCourseRepository = {
      //update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      preload: jest.fn().mockReturnValue(Promise.resolve(undefined)),
    };

    const mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;
    const updateCourseDto: UpdateCourseDto = {
      name: 'Test',
      description: 'Test description',
      tags: ['nestjs'],
    };

    try {
      await service.update(id, updateCourseDto);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe(`Course ID ${id} not found`);
    }
  });

  // describe('find One', () => {
  //   describe('buscar o curso pelo ID', () => {
  //     it('deve retornar o objeto course', async () => {
  //       const courseId = '1';
  //       const expectCourse = {};

  //       coursesRepository.findOne.mockReturnValue(expectCourse);

  //       const course = await service.findOne(courseId);

  //       expect(course).toEqual(expectCourse);
  //     });

  //     it('deve retornar NotFoundException', async () => {
  //       const courseId = '1';
  //       coursesRepository.findOne.mockReturnValue(undefined);

  //       try {
  //         await service.findOne(courseId);
  //       } catch (error) {
  //         expect(error).toBeInstanceOf(NotFoundException);
  //         expect(error.message).toEqual(`Course ID ${courseId} not found`);
  //       }
  //     });
  //   });
  // });
});
