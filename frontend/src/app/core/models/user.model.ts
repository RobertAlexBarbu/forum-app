import { RoleModel } from './role.model';

export interface UserModel {
  id?: number;
  username?: string;
  email?: string;
  createdAt?: string;
  role?: RoleModel;
}
