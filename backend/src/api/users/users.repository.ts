import {DatabaseRepository} from "../../db/database.repository";
import {CamelcaseService} from "../../services/camelcase.service";
import {UserModel} from "./model/user.model";

export class UsersRepository extends DatabaseRepository {
  table = 'users'
  async getAll() {
    const users = await this.database(this.table).join('roles', 'roles.id', 'users.role_id').select('username', 'users.id', 'role', 'email')
    return CamelcaseService.camelizeArray(users) as UserModel[];
  }
}