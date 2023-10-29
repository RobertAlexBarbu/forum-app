import {ApplicationConfig} from '@angular/core';
import {
  provideRouter,
} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideState, provideStore} from "@ngrx/store";
import {authReducer} from "./core/store/auth/auth.reducer";
import {provideNgIconsConfig} from "@ng-icons/core";



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideNgIconsConfig({size: '1rem'}), provideStore(), provideState({
    name: 'auth',
    reducer: authReducer
  })]
};
