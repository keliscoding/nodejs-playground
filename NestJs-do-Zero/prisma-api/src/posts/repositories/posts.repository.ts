import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from '../../common/errors/types/NotFoundError';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostEntity } from '../entities/post.entity';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const { authorEmail: email } = createPostDto;

    delete createPostDto.authorEmail;

    const user = await this.prisma.user
      .findUniqueOrThrow({
        where: { email },
      })
      .catch(err => {
        throw new NotFoundError('Author not found');
      });

    const data: Prisma.PostCreateInput = {
      ...createPostDto,
      author: { connect: { email } },
    };

    return this.prisma.post.create({
      data,
    });
  }

  async findAll(): Promise<Array<PostEntity>> {
    return this.prisma.post.findMany();
  }

  async findOne(id: number): Promise<PostEntity> {
    return this.prisma.post.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return this.prisma.post.update({ where: { id }, data: updatePostDto });
  }

  async remove(id: number): Promise<PostEntity> {
    return this.prisma.post.delete({ where: { id } });
  }
}
