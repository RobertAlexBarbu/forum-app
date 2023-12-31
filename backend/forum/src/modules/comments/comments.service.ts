import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { EntityManager } from '@mikro-orm/core';
import { Comments } from './entities/Comments';

@Injectable()
export class CommentsService {
  constructor(private readonly em: EntityManager) {}

  async create(createCommentDto: CreateCommentDto, userId: number) {
    const post = this.em.create(Comments, {
      user: userId,
      post: createCommentDto.postId,
      content: createCommentDto.content,
    });
    this.em.persist(post);
    await this.em.flush();
    return post;
  }

  findAllByPost(id: number) {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: number) {
    const comment = this.em.getReference(Comments, id);
    this.em.remove(comment);
    await this.em.flush();
    return comment;
  }
}
