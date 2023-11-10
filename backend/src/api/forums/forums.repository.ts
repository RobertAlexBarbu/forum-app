import {DatabaseRepository} from "../../db/database.repository";
import {CreateForumModel} from "./model/create-forum.model";
import {EditForumModel} from "./model/edit-forum.model";

export class ForumsRepository extends DatabaseRepository {
  table = 'forums';

  async insertForum(forum: CreateForumModel) {
    const result = await this.database('forums').insert(forum).returning('*');
    return result[0];
  }

  async getForums() {
    const result = await this.database.raw(`
        select forums.name,
               forums.id,
               max(posts.created_at) as latest_post,
               count(posts.id)       as posts_count
        from forums
                 left join posts on forums.id = posts.forum_id
        group by forums.name, forums.id
        order by forums.name` // order by created_at
    );
    return result.rows;
  }

  async deleteForum(id: string) {
    return this.database(this.table)
      .delete()
      .where('id', id)
      .returning('*');
  }

  async getForumWithCategories(id: string) {
    const result = await this.database.raw(`
        select forums.name,
               forums.id,
               (select coalesce(json_agg(categories), '[]')
                from (select * from categories where categories.forum_id = forums.id) as categories) as categories
        from forums
        where forums.id = ?
    `, [id])
    return result.rows[0];
  }

  async editForum(id: string, body: EditForumModel) {
    return this.database.transaction(async trx => {
      await trx('forums').update('name', body.name).where('id', body.id);
      if (body.addedCategories.length > 0) {
        await trx('categories').insert(body.addedCategories);
      }
      if (body.deletedCategoriesIds.length > 0) {
        await trx('categories')
          .delete()
          .whereIn('id', body.deletedCategoriesIds)
      }
    })
  }

  async getForum(id: string) {
    const result = await this.database.raw(`
        select forums.name,
               forums.id,
               (select coalesce(json_agg(categories), '[]') from categories) as categories,
               (select coalesce(json_agg(posts), '[]') from (
               select posts.*, to_json(categories) as category, users.username as created_by
               from posts left join categories on categories.id = posts.category_id
               join users on users.id = posts.user_id
               ) as posts)           as posts
        from forums
        where forums.id = ?`, [id])
    return result.rows[0];
  }

}