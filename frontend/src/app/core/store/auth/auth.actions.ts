import {createAction, props} from "@ngrx/store";
import {SessionDataModel} from "../../models/session-data.model";

export const login = createAction('[Auth] Log In', props<{sessionData: SessionDataModel}>());
export const signup = createAction('[Auth] Sign Up', props<{sessionData: SessionDataModel}>());
export const logout = createAction('[Auth] Log Out');
export const isAuth = createAction('[Auth] User is authenticated', props<{sessionData: SessionDataModel}>())
