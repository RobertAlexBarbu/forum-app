import { inject, Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { AuthStateModel } from '../../store/auth/auth-state.model';
import { FirebaseTokenDto } from '../../../features/auth-feature/dto/firebase-token.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpService = inject(HttpService);

  login(firebaseTokenDto: FirebaseTokenDto) {
    return this.httpService.post<{ access_token: string }>(
      'auth/login',
      firebaseTokenDto
    );
  }

  signup(firebaseTokenDto: FirebaseTokenDto) {
    return this.httpService.post<{ access: string }>('users', firebaseTokenDto);
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
