import {DatabaseRepository} from "../../db/database.repository";
import {CreateForumModel} from "../forums/model/create-forum.model";

export class PostsRepository extends DatabaseRepository {
  table = 'posts';

  async createPost(body: CreateForumModel, userId: number) {
    body.user_id = userId;
    const result = await this.database(this.table).insert(body).returning('*')
    return result[0];
  }

  async likePost(postId: string, userId: number) {
     await this.database('post_likes').insert({user_id: userId, post_id: postId});
  }
  async dislikePost(postId: string, userId: number) {
     await this.database('post_likes').delete().where('post_id', postId).andWhere('user_id', userId)
  }

  async getPost(id: string) {
    const result = await this.database.raw(`
        select posts.*,
               to_json(categories)                                 as category,
               users.username                                      as created_by,
               (select coalesce(json_agg(post_likes), '[]')
                from (select post_likes.*, users.username as username
                      from post_likes
                               join users on users.id = post_likes.user_id
                      where post_likes.post_id = ?) as post_likes) as likes,
               (select coalesce(json_agg(comments), '[]')
                from (select comments.*, users.username as username
                      from comments
                               join users on users.id = comments.user_id
                      where comments.post_id = ?) as comments) as comments
        from posts
                 left join categories on categories.id = posts.category_id
                 join users on users.id = posts.user_id
        where posts.id = ?
    `, [id, id, id])
    return result.rows[0];
  }
}