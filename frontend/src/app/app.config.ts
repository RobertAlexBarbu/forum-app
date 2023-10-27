import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideState, provideStore} from "@ngrx/store";
import {authReducer} from "./core/store/auth/auth.reducer";
import {isAuthPipe} from "./shared/pipes/is-auth.pipe";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideStore(), provideState({name: 'auth', reducer: authReducer}) ]
};
