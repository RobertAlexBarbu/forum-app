import { Routes } from '@angular/router';
import { forumsRoutes } from './features/forums-feature/forums.routes';

export const routes: Routes = [
  ...forumsRoutes,
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth-feature/auth.routes').then((m) => m.authRoutes)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin-feature/admin.routes').then((m) => m.adminRoutes)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];
