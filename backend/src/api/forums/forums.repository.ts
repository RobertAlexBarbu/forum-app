import {DatabaseRepository} from "../../db/database.repository";
import {CreateForumModel} from "./model/create-forum.model";
import {CamelcaseService} from "../../services/camelcase.service";

export class ForumsRepository extends DatabaseRepository {
  table = 'forums';
  async insertForum(forum: CreateForumModel) {
    const result = await this.database('forums').insert(forum).returning('*');
    return CamelcaseService.camelize(result[0]) as CreateForumModel;
  }
  async getForums() {
    const result = await this.database.raw(`
        select forums.name, forums.id, max(posts.created_at) as latest_post, count(posts.id) as posts_count
        from forums left join posts on forums.id = posts.forum_id
        group by forums.name, forums.id`

    );
    console.log(result);
    return CamelcaseService.camelizeArray(result.rows);
  }
}