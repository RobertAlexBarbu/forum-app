import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login-page/login-page.component').then(
            (m) => m.LoginPageComponent
          )
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./pages/signup-page/signup-page.component').then(
            (m) => m.SignupPageComponent
          )
      },
      {
        path: 'reset',
        loadComponent: () =>
          import('./pages/reset-password-page/reset-password-page.component').then(
            (m) => m.ResetPasswordPageComponent
          )
      },
      {
        path: 'reset-success',
        loadComponent: () =>
          import('./pages/reset-succesful-page/reset-succesful-page.component').then(
            (m) => m.ResetSuccesfulPageComponent
          )
      }
    ]
  }
];
