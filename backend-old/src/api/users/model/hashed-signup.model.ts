import {JsonObject} from "type-fest";


export interface HashedSignupModel extends JsonObject{
    username: string,
    email: string,
    password_hash: string,
    password_salt: string,
    roleId: number
}