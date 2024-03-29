import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection
} from '@angular/core';
import {
  InMemoryScrollingOptions,
  provideRouter,
  withInMemoryScrolling,
  withRouterConfig
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { authReducer } from './core/store/auth/auth.reducer';
import { provideNgIconsConfig } from '@ng-icons/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { AngularFireModule } from '@angular/fire/compat';
import { errorInterceptor } from './core/interceptors/error.interceptor';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled'
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling(scrollConfig),
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      })
    ),
    provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor])),
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideNgIconsConfig({ size: '1rem' }),
    provideStore(),
    provideState({
      name: 'auth',
      reducer: authReducer
    }),
    importProvidersFrom(
      AngularFireModule.initializeApp({
        projectId: 'ssd-project-1f0eb',
        appId: '1:897753042865:web:9310bb659a3ddd31043790',
        storageBucket: 'ssd-project-1f0eb.appspot.com',
        apiKey: 'AIzaSyBBU1wO-V4gMnTNSSNct9OT-3jgOSnZCKA',
        authDomain: 'app.forumly.xyz',
        messagingSenderId: '897753042865'
      })
    )
  ]
};
