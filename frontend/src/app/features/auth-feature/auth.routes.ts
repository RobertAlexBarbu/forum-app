import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent)
      },
      {
        path: 'signup',
        loadComponent: () => import('./pages/signup-page/signup-page.component').then(m => m.SignupPageComponent)
      }
    ]
  }
];
