import * as AuthActions from './auth.actions';
import { createReducer, on } from '@ngrx/store';
import { AuthStateModel } from './auth-state.model';

export const initialAuthState: AuthStateModel = {
  username: '',
  id: -1,
  role: {
    id: -1,
    role: 'none'
  },
  loggedIn: false
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, { authState }) => ({
    username: authState.username,
    id: authState.id,
    role: authState.role,
    loggedIn: true
  })),
  on(AuthActions.signup, (state, { authState }) => ({
    username: authState.username,
    id: authState.id,
    role: authState.role,
    loggedIn: true
  })),
  on(AuthActions.logout, (state) => ({ ...initialAuthState })),
  on(AuthActions.isAuth, (state, { authState }) => ({
    username: authState.username,
    id: authState.id,
    role: authState.role,
    loggedIn: true
  }))
);
