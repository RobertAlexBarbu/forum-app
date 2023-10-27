import {Routes} from '@angular/router';
import {LoginPageComponent} from "./features/auth/pages/login-page/login-page.component";
import {SignupPageComponent} from "./features/auth/pages/signup-page/signup-page.component";
import {HomePageComponent} from "./features/forum/pages/home-page/home-page.component";
import {UserPageComponent} from "./features/forum/pages/user-page/user-page.component";
import {isAuth} from "./core/store/auth/auth.actions";
import {isAuthGuard} from "./core/guards/is-auth.guard";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'signup',
    component: SignupPageComponent
  },
  {
    path: 'user',
    component: UserPageComponent,
    canMatch: [isAuthGuard]
  }
];
