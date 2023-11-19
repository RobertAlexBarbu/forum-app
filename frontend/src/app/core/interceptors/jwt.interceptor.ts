import {
  HttpEvent,
  HttpEventType,
  HttpInterceptorFn
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';


export const jwtInterceptor: HttpInterceptorFn = (request, next): Observable<HttpEvent<unknown>> => {
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${access_token}` }
      });
    }
    return next(request)
  }

