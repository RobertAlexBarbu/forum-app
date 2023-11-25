import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { logout } from '../store/auth/auth.actions';

export const isAuthGuard: CanMatchFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const store = inject(Store);
  return authService.checkAuth().pipe(
    map((data) => {
      if (authService.isAuth(data)) {
        store.dispatch(logout());
        return router.parseUrl('login');
      } else {
        return true;
      }
    })
  );
};
