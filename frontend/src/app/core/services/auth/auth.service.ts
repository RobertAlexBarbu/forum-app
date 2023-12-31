import { inject, Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { AuthStateModel } from '../../models/auth-state.model';
import { FirebaseTokenDto } from '../../../features/auth-feature/dto/firebase-token.dto';
import { Roles } from '../../models/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpService = inject(HttpService);

  login(firebaseTokenDto: FirebaseTokenDto) {
    return this.httpService.post<{ access: string }, FirebaseTokenDto>(
      'auth/login',
      firebaseTokenDto
    );
  }

  signup(firebaseTokenDto: FirebaseTokenDto) {
    return this.httpService.post<{ access: string }, FirebaseTokenDto>(
      'users',
      firebaseTokenDto
    );
  }

  logout() {
    localStorage.removeItem('access');
  }

  checkAuth() {
    return this.httpService.post<AuthStateModel>('auth/check', {});
  }

  isAuth(state: AuthStateModel) {
    return state.role !== Roles.None;
  }

  isAdmin(state: AuthStateModel) {
    return state.role === Roles.Admin;
  }

  extractState(data: { access: string }): AuthStateModel {
    localStorage.setItem('access', data.access);
    const authState = JSON.parse(atob(data.access.split('.')[1]));
    return {
      id: authState.sub,
      username: authState.username,
      email: authState.email,
      role: authState.role.id
    };
  }
}
