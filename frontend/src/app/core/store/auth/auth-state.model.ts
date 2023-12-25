import { Roles } from '../../models/roles.enum';

export interface AuthStateModel {
  id: string;
  username: string;
  email: string;
  role: Roles;
}
