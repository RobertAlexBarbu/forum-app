import {DatabaseRepository} from "../../db/database.repository";
import {CreateCommentModel} from "./model/create-comment.model";

export class CommentsRepository extends DatabaseRepository {
  table = 'comments';
  async createComment(userId: number, comment: CreateCommentModel) {
    comment.user_id = userId;
    const result = await this.database(this.table).insert(comment).returning('*');
    return result[0];
  }
}