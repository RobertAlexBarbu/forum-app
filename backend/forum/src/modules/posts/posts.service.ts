import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { EntityManager } from '@mikro-orm/core';
import { Posts } from './entities/Posts';
import { Users } from '../users/entities/Users';

@Injectable()
export class PostsService {
  constructor(private readonly em: EntityManager) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    const user = this.em.getReference(Users, userId);
    const post = this.em.create(Posts, {
      user: user,
      content: createPostDto.content,
      title: createPostDto.title,
      category: createPostDto.categoryId,
      forum: createPostDto.forumId,
      createdAt: new Date(),
    });
    this.em.persist(post);
    await this.em.flush();
    return post;
  }

  async findAllByForum(id: number) {
    const posts = await this.em.find(
      Posts,
      { forum: id },
      { populate: ['postLikes', 'category'], orderBy: { createdAt: 'desc' } },
    );
    await this.em.populate(posts, ['comments'], {
      fields: ['comments.createdAt'],
    });
    return posts;
  }

  async findOne(id: number) {
    return await this.em.findOne(Posts, id, {
      populate: ['postLikes', 'comments.user', 'category', 'user'], fields: ['user.username', 'comments', 'category', 'title', 'createdAt', 'content', 'postLikes'],
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
