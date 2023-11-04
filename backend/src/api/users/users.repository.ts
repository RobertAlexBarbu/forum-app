import {DatabaseRepository} from "../../db/database.repository";
import {CamelcaseService} from "../../services/camelcase.service";
import {UserModel} from "./model/user.model";
import {HashedSignupModel} from "./model/hashed-signup.model";

export class UsersRepository extends DatabaseRepository {
  table = 'users'
  async getAll() {
    const users = await this.database(this.table).join('roles', 'roles.id', 'users.role_id').select('username', 'users.id', 'role', 'email')
    return CamelcaseService.camelizeArray(users) as UserModel[];
  }
  async saveUser(user: HashedSignupModel) {
    const result = await this.database(this.table)
      .insert(CamelcaseService.decamelize(user));
  }


  async getUserByEmailAndUsername(username: string, email: string) {
    const result = await this.database(this.table)
      .select('id')
      .where('username', username)
      .orWhere('email', email);
    if (result.length === 0) {
      return null;
    }
    return result;
  }
}