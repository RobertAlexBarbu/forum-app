import {CanMatchFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth/auth.service";
import {map} from "rxjs";

export const isAdminGuard: CanMatchFn = (route) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  return authService.checkAuth().pipe(map((data) => {
    if (authService.isAdmin(data)) {
      return true;
    } else {
      return router.parseUrl('');
    }
  }))
}
