import {inject, Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {SignupModel} from "../../../features/auth/model/signup.model";
import {SessionDataModel} from "../../model/session-data.model";
import {LoginModel} from "../../../features/auth/model/login.model";
import {AuthStateModel} from "../../model/auth-state.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpService = inject(HttpService);


  login(loginData: LoginModel) {
    return this.httpService.save<SessionDataModel>('login', loginData);
  }

  signup(signupData: SignupModel) {
    return this.httpService.save<SessionDataModel>('signup', signupData)
  }

  logout() {
    return this.httpService.get('logout');
  }

  checkAuth() {
    return this.httpService.get<SessionDataModel|false>('isAuth');
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
