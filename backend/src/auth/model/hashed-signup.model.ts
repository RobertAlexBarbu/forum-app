import {JsonObject} from "type-fest";


export interface HashedSignupModel extends JsonObject{
    username: string,
    email: string,
    passwordHash: string,
    passwordSalt: string,
    roleId: number
}