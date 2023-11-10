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

}