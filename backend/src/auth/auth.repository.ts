import {DatabaseRepository} from "../db/database.repository";
import {CamelcaseService} from "../services/camelcase.service";
import {HashedSignupModel} from "./model/hashed-signup.model";
import {AuthDataModel} from "./model/auth-data.model";

export class AuthRepository extends DatabaseRepository {
    table = 'users';
    async saveUser(user: HashedSignupModel) {
        const result = await this.database(this.table).insert(CamelcaseService.decamelize(user));
    }
    async getUserAuthData(username: string) {
        const result = await this.database(this.table).join('roles', 'users.role_id', 'roles.id').select('users.id', 'username', 'password_hash', 'password_salt', 'role').where('username', username).orWhere( 'email', username);
        if(result.length === 0) {
            return null;
        }
        return CamelcaseService.camelize(result[0]) as AuthDataModel;
    }
}