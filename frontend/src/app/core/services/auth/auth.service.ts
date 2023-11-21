import {inject, Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {CreateUserDto} from "../../../features/auth-feature/dto/create-user.dto";
import {LoginDto} from "../../../features/auth-feature/dto/login.dto";
import {AuthStateModel} from "../../store/auth/auth-state.model";
import {catchError, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpService = inject(HttpService);


  login(loginData: LoginDto) {
    return this.httpService.post<{access_token: string}>('auth/login', loginData).pipe(catchError((error: HttpErrorResponse) => {
      console.log(error.status);
      if (error.status === 401) {
        return throwError(() => new Error('⚠ Invalid credentials'))
      } else {
        return throwError(() => new Error('⚠ ' + error.statusText));
      }

    }));
  }

  signup(signupData: CreateUserDto) {
    return this.httpService.post<{access_token: string}>('users', signupData).pipe(catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('⚠ ' + error.statusText));
    }));
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  checkAuth() {
    return this.httpService.post<AuthStateModel>('auth/check');
  }

  isAuth(state: AuthStateModel) {
    return state.loggedIn
  }

  isAdmin(state: AuthStateModel) {
    if(state.role) {
      return state.role.role === 'admin';
    } else {
      return false;
    }
  }

  constructor() {
  }
}
