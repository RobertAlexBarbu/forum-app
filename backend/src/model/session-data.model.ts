import {JsonObject} from "type-fest";

export interface SessionDataModel extends JsonObject{
  id: number,
  username: string,
  role: string,
}