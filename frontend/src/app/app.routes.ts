import {Routes} from '@angular/router';
import {authRoutes} from "./features/auth-feature/auth.routes";
import {forumsRoutes} from "./features/forums-feature/forums.routes";



export const routes: Routes = [
  ...authRoutes,
  ...forumsRoutes,
  {
    path: 'admin',
    loadChildren: () => import('./features/admin-feature/admin.routes').then((m) => m.adminRoutes)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];
