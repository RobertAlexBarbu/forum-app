import {DatabaseRepository} from "../../db/database.repository";
import {CreateForumModel} from "./model/create-forum.model";
import {CamelcaseService} from "../../services/camelcase.service";

export class ForumsRepository extends DatabaseRepository {
  table = 'forums';
  async insertForum(forum: CreateForumModel) {
    const result = await this.database(this.table).insert(forum).returning('*');
    return CamelcaseService.camelize(result[0]) as CreateForumModel;
  }
  async getForums() {
    return this.database(this.table).select('*');
  }
}