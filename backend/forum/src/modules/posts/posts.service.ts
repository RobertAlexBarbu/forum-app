import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { EntityManager } from '@mikro-orm/core';
import { Posts } from './entities/Posts';
import { Users } from '../users/entities/Users';
import {PostLikes} from "./entities/PostLikes";

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
      { populate: ['postLikes.user', 'category'], orderBy: { createdAt: 'desc' } },
    );
    await this.em.populate(posts, ['comments'], {
      fields: ['comments.createdAt'],
    });
    return posts;
  }

  async findOne(id: number) {
    return await this.em.findOne(Posts, id, {
      populate: ['postLikes.user', 'comments.user', 'category', 'user'], fields: ['user.username', 'comments', 'category', 'title', 'createdAt', 'content', 'postLikes', 'postLikes.user.id'],
    });
  }
  async likePost(id: number, userId: number) {
    const like = this.em.create(PostLikes, {post: id, user: userId});
    this.em.persist(like);
    await this.em.flush();
    return like;
  }

  async dislikePost(id: number, userId: number) {
    const like = await this.em.find(PostLikes, {post:id, user: userId});
    this.em.remove(like);
    await this.em.flush();
    return like
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
