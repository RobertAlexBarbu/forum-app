import * as AuthActions from "./auth.actions";
import {createReducer, on} from "@ngrx/store";
import {AuthStateModel} from "../../models/auth-state.model";

export const initialAuthState: AuthStateModel = {
  username: '',
  id: -1,
  role: 'none',
  loggedIn: false
}

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, {sessionData}) => ({
    username: sessionData.username,
    id: sessionData.id,
    role: sessionData.role,
    loggedIn: true
  })),
  on(AuthActions.signup, (state, {sessionData}) => ({
    username: sessionData.username,
    id: sessionData.id,
    role: sessionData.role,
    loggedIn: true
  })),
  on(AuthActions.logout, (state) => ({...initialAuthState})),
  on(AuthActions.isAuth, (state, {sessionData}) => ({
    username: sessionData.username,
    id: sessionData.id,
    role: sessionData.role,
    loggedIn: true
  })),
)
