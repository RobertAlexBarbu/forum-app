import {DatabaseRepository} from "../../db/database.repository";
import {CreateForumModel} from "../forums/model/create-forum.model";

export class PostsRepository extends DatabaseRepository {
  table = 'posts';

  async createPost(body: CreateForumModel) {
    const result = await this.database(this.table).insert(body).returning('*')
    return result[0];
    }
}