import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { EntityManager } from '@mikro-orm/core';
import { Comment } from './entities/Comment';

@Injectable()
export class CommentsService {
  constructor(private readonly em: EntityManager) {}

  async create(createCommentDto: CreateCommentDto, userId: string) {
    const post = this.em.create(Comment, {
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
    const comment = this.em.getReference(Comment, id);
    this.em.remove(comment);
    await this.em.flush();
    return comment;
  }
}
