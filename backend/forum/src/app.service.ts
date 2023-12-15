import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Posts } from './modules/api/posts/entities/Posts';

@Injectable()
export class AppService {
  constructor(private em: EntityManager) {}

  async getHello() {
    return await this.em.find(Posts, {});
  }
}
