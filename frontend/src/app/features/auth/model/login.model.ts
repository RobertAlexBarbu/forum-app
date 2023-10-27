import {JsonObject} from "type-fest";

export interface LoginModel extends JsonObject {
    username: string,
    password: string
}