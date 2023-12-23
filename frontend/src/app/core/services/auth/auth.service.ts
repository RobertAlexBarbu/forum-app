import { inject, Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { LoginDto } from '../../../features/auth-feature/dto/login.dto';
import { AuthStateModel } from '../../store/auth/auth-state.model';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FirebaseTokenDto } from '../../../features/auth-feature/dto/firebase-token.dto';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpService = inject(HttpService);
  errorService = inject(ErrorService);

  login(loginData: LoginDto) {
    return this.httpService
      .post<{ access_token: string }>('auth/login', loginData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.handleError(error);
        })
      );
  }

  signup(firebaseTokenDto: FirebaseTokenDto) {
    return this.httpService
      .post<AuthStateModel>('users', firebaseTokenDto)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.message);
          return this.errorService.handleError(error);
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  checkAuth() {
    return this.httpService.post<AuthStateModel>('auth/check');
  }

  isAuth(state: AuthStateModel) {
    return state.loggedIn;
  }

  isAdmin(state: AuthStateModel) {
    if (state.role) {
      return state.role.role === 'admin';
    } else {
      return false;
    }
  }
}
