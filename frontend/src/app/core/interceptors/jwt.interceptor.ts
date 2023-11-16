import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpInterceptorFn
} from '@angular/common/http';
import { Observable } from 'rxjs';



  export const jwtInterceptor: HttpInterceptorFn = (request, next): Observable<HttpEvent<unknown>> => {
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${access_token}` }
      });
    }

    return next(request);
  }

