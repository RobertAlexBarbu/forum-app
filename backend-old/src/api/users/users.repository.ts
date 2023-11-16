import {DatabaseRepository} from "../../db/database.repository";
import {HashedSignupModel} from "./model/hashed-signup.model";

export class UsersRepository extends DatabaseRepository {
  table = 'users'
  async getAll() {
    return this.database(this.table)
      .join('roles', 'roles.id', 'users.role_id')
      .select('username', 'users.id', 'role', 'email');
  }
  async saveUser(user: HashedSignupModel) {
    const result = await this.database(this.table)
      .insert(user);
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