import {createAction, props} from "@ngrx/store";
import {AuthStateModel} from "./auth-state.model";


export const login = createAction('[Auth] Log In', props<{authState: AuthStateModel}>());
export const signup = createAction('[Auth] Sign Up', props<{authState: AuthStateModel}>());
export const logout = createAction('[Auth] Log Out');
export const isAuth = createAction('[Auth] User is authenticated', props<{authState: AuthStateModel}>())
