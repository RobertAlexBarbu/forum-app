import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Post } from './modules/api/posts/entities/Post';

@Injectable()
export class AppService {
  constructor(private em: EntityManager) {}

  async getHello() {
    return await this.em.find(Post, {});
  }
}
