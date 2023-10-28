import {ApplicationConfig} from '@angular/core';
import {
  InMemoryScrollingOptions,
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideState, provideStore} from "@ngrx/store";
import {authReducer} from "./core/store/auth/auth.reducer";
import {provideNgIconsConfig} from "@ng-icons/core";

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'disabled',
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withInMemoryScrolling(scrollConfig)), provideHttpClient(), provideNgIconsConfig({size: '1rem'}), provideStore(), provideState({
    name: 'auth',
    reducer: authReducer
  })]
};
