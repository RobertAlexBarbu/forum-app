import {Inject, Injectable} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { EntityManager } from '@mikro-orm/core';
import { Posts } from './entities/Posts';
import { User } from '../users/entities/User';
import {PostLikes} from "./entities/PostLikes";
import {Categories} from "../forums/entities/Categories";

@Injectable()
export class PostsService {
  // constructor(private readonly em: EntityManager) {}
  @Inject(EntityManager) private readonly em: EntityManager;

  // async create(createPostDto: CreatePostDto, userId: number) {
  //   const user = this.em.getReference(AppUser, userId);
  //   const post = this.em.create(Posts, {
  //     user: user,
  //     content: createPostDto.content,
  //     title: createPostDto.title,
  //     category: createPostDto.categoryId,
  //     forum: createPostDto.forumId,
  //     createdAt: new Date(),
  //   });
  //   this.em.persist(post);
  //   await this.em.flush();
  //   return post;
  // }

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

  // async findOne(id: number) {
  //   return await this.em.findOne(Posts, id, {
  //     populate: ['postLikes.user', 'comments.user', 'category', 'user', 'forum.categories'], fields: ['user.username', 'comments', 'category', 'title', 'createdAt', 'content', 'postLikes', 'postLikes.user.id', 'postLikes.user.username', 'forum'],
  //   });

  }
  // async likePost(id: number, userId: number) {
  //   const like = this.em.create(PostLikes, {post: id, user: userId});
  //   this.em.persist(like);
  //   await this.em.flush();
  //   return like;
  // }
  //
  // async dislikePost(id: number, userId: string) {
  //   const like = await this.em.find(PostLikes, {post:id, user: userId});
  //   this.em.remove(like);
  //   await this.em.flush();
  //   return like
  // }

  // async update(id: number, updatePostDto: UpdatePostDto) {
  //   console.log(updatePostDto.categoryId + ' - ' + id);
  //   const post = await this.em.findOne(Posts, id);
  //   if(updatePostDto.categoryId === null) {
  //     post.category = null;
  //   } else {
  //     post.category = this.em.getReference(Categories, updatePostDto.categoryId)
  //   }
  //
  //   post.content = updatePostDto.content;
  //   post.title = updatePostDto.title;
  //   this.em.persist(post);
  //   await this.em.flush();
  //   return post;
  // }


  // async remove(id: number) {
  //   const post = this.em.getReference(Posts, id);
  //   this.em.remove(post);
  //   await this.em.flush();
  //   return post;
  // }

