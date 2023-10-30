import {inject, Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {SignupModel} from "../../../features/auth/model/signup.model";
import {SessionDataModel} from "../../model/session-data.model";
import {LoginModel} from "../../../features/auth/model/login.model";
import {AuthStateModel} from "../../model/auth-state.model";
import {catchError, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpService = inject(HttpService);


  login(loginData: LoginModel) {
    return this.httpService.save<SessionDataModel>('login', loginData).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return throwError(() => new Error('⚠ Invalid credentials'))
      } else {
        return throwError(() => new Error('⚠ Something went wrong'))
      }

    }));
  }

  signup(signupData: SignupModel) {
    return this.httpService.save<SessionDataModel>('signup', signupData)
  }

  logout() {
    return this.httpService.post('logout');
  }

  checkAuth() {
    return this.httpService.get<SessionDataModel | false>('isAuth');
  }

  isAuth(state: AuthStateModel) {
    return state.loggedIn;
  }

  isModerator(state: AuthStateModel | SessionDataModel) {
    return state.role === 'admin' || state.role === 'moderator';
  }

  isAdmin(state: AuthStateModel | SessionDataModel) {
    return state.role === 'admin';
  }

  constructor() {
  }
}
