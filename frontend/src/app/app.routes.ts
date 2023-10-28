import {Routes} from '@angular/router';
import {HomePageComponent} from "./features/forum/pages/home-page/home-page.component";
import {UserPageComponent} from "./features/forum/pages/user-page/user-page.component";
import {isAuthGuard} from "./core/guards/is-auth.guard";
import {authRoutes} from "./features/auth/auth.routes";



export const routes: Routes = [
  ...authRoutes,
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'user',
    component: UserPageComponent,
    canMatch: [isAuthGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];
