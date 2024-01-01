import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {EntityManager, serialize} from "@mikro-orm/core";
import {User} from "../users/entities/User";

import {Post} from "../posts/entities/Post";

@Injectable()
export class ProfileService {
  constructor(private readonly em: EntityManager) {
  }

  async findOne(username: string) {
    const user = await this.em.findOne(User, {username: username}, {populate: ['role']})
    const serializedUser = serialize(user, {
      forceObject: true,
      skipNull: false
    })
    const posts = await this.em.find(Post,{user: { username: username
      }}, {populate: [ 'forum', 'postLikes', 'comments', 'user', 'category']})

    return {user: serializedUser, posts}
  }

  create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  findAll() {
    return `This action returns all profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
