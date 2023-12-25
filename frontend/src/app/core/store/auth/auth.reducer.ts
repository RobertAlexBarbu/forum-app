import * as AuthActions from './auth.actions';
import { createReducer, on } from '@ngrx/store';
import { AuthStateModel } from './auth-state.model';

export const initialAuthState: AuthStateModel = {
  username: '',
  uid: '',
  email: '',
  role: 0
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, { authState }) => ({
    username: authState.username,
    email: authState.email,
    uid: authState.uid,
    role: authState.role
  })),
  on(AuthActions.signup, (state, { authState }) => ({
    username: authState.username,
    email: authState.email,
    uid: authState.uid,
    role: authState.role
  })),
  on(AuthActions.logout, (state) => ({ ...initialAuthState })),
  on(AuthActions.isAuth, (state, { authState }) => ({
    username: authState.username,
    email: authState.email,
    uid: authState.uid,
    role: authState.role
  }))
);
