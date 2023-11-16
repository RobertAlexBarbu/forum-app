import { Injectable } from '@nestjs/common';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { EntityManager } from '@mikro-orm/core';
import { Forums } from './entities/Forums';
import { Categories } from './entities/Categories';

@Injectable()
export class ForumsService {
  constructor(private readonly em: EntityManager) {}

  async create(createForumDto: CreateForumDto) {
    const forum = this.em.create(Forums, createForumDto);
    await this.em.persist(forum).flush();
    return forum;
  }

  async findAll() {
    const forums = await this.em.find(
      Forums,
      {},
      { populate: ['categories'], orderBy: { name: 'asc' } },
    );
    await this.em.populate(forums, ['posts.createdAt'], {
      fields: ['posts.createdAt'],
    });
    return forums;
  }

  async findOne(id: number) {
    const forum = await this.em.findOne(
      Forums,
      { id: id },
      { populate: ['categories', 'posts.postLikes'] },
    );
    await this.em.populate(forum, ['posts.user'], {
      fields: ['posts.user.username'],
    });
    console.log(forum.posts);
    return forum;
  }
  async findOneForEdit(id: number) {
    return await this.em.findOne(
      Forums,
      { id: id },
      { populate: ['categories'] },
    );
  }

  async update(id: number, updateForumDto: UpdateForumDto) {
    const forum = this.em.getReference(Forums, id);
    updateForumDto.deletedCategories.forEach((c) => {
      let category = this.em.getReference(Categories, c.id);
      this.em.remove(category);
    });
    updateForumDto.addedCategories.forEach((c) => {
      let category = this.em.create(Categories, c);
      category.forum = forum;
      this.em.persist(category);
    });
    forum.name = updateForumDto.name;
    await this.em.flush();
    return forum;
  }

  async remove(id: number) {
    const ref = this.em.getReference(Forums, id);
    this.em.remove(ref);
    await this.em.flush();
    return ref;
  }
}
