import {DatabaseRepository} from "../../db/database.repository";
import {UsersRepository} from "./users.repository";

export class UsersService {
    private static usersRepository = new UsersRepository();
    static async getAll() {
        return await this.usersRepository.getAll();
    }
}