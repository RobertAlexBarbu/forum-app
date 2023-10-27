import {roleType} from "./role.type";

export interface AuthStateModel {
  username: string,
  id: number,
  role: roleType,
  loggedIn: boolean
}
