import {DatabaseRepository} from "../../db/database.repository";
import {CreateForumModel} from "./model/create-forum.model";
import {CamelcaseService} from "../../services/camelcase.service";
import {EditForumModel} from "./model/edit-forum.model";

export class ForumsRepository extends DatabaseRepository {
  table = 'forums';

  async insertForum(forum: CreateForumModel) {
    const result = await this.database('forums').insert(forum).returning('*');
    return CamelcaseService.camelize(result[0]) as CreateForumModel;
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
    return CamelcaseService.camelizeArray(result.rows);
  }

  async deleteForum(id: string) {
    const result = await this.database(this.table)
      .delete()
      .where('id', id)
      .returning('*');
    return CamelcaseService.camelizeArray(result)
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
    return CamelcaseService.camelize(result.rows[0])
  }

  async editForum(id: string, body: EditForumModel) {
    return this.database.transaction(async trx => {
      console.log(body.name);
      await trx('forums').update('name', body.name);
      if(body.addedCategories.length > 0) {
        await trx('categories').insert(body.addedCategories);
      }
      if(body.deletedCategoriesIds.length > 0) {
        await trx('categories').delete().whereIn('id', body.deletedCategoriesIds)
      }

    })
  }
}