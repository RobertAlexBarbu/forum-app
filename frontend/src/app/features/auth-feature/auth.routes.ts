import { LoginPageComponent } from './pages/login-page/login-page.component';
import { Routes } from '@angular/router';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { FirebaseService } from './services/firebase/firebase.service';

export const authRoutes: Routes = [
  {
    path: '',
    providers: [FirebaseService],
    children: [
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'signup',
        component: SignupPageComponent
      }
    ]
  }
];
