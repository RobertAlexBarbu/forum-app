import {JsonObject} from "type-fest";

export interface SignupModel extends JsonObject{
    username: string,
    email: string,
    password: string
}