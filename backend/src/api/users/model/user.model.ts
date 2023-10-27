import {JsonObject} from "type-fest";

export interface UserModel extends JsonObject {
  username: string,
  email: string,
  role: string,
  id: number
}