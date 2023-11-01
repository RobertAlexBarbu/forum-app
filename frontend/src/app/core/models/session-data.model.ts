import {JsonObject} from "type-fest";
import {roleType} from "./role.type";

export interface SessionDataModel extends JsonObject{
  id: number,
  username: string,
  role: roleType,
}

