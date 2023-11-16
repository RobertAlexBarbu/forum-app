import {RoleModel} from "../../models/role.model";

export interface AuthStateModel {
  id: number
  username: string
  role: RoleModel
  loggedIn: boolean
}
