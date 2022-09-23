import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../common/errors/types/NotFoundError';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './repositories/posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly repository: PostsRepository) {}

  create(createPostDto: CreatePostDto) {
    return this.repository.create(createPostDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    return this.repository.findOne(id).catch(err => {
      throw new NotFoundError(`Post ${id} not found`);
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return this.repository.update(id, updatePostDto).catch(err => {
      throw new NotFoundError(`Post ${id} not found`);
    });
  }

  async remove(id: number) {
    return this.repository.remove(id).catch(err => {
      throw new NotFoundError(`Post ${id} not found`);
    });
  }
}
