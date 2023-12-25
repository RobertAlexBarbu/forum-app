import { Roles } from '../../models/roles.enum';

export interface AuthStateModel {
  uid: string;
  username: string;
  email: string;
  role: Roles;
}
