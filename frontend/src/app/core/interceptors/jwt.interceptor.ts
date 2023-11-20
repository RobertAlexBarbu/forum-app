import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpInterceptorFn
} from '@angular/common/http';
import {catchError, Observable, of, tap, throwError} from 'rxjs';


export const jwtInterceptor: HttpInterceptorFn = (request, next): Observable<HttpEvent<unknown>> => {
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${access_token}` }
      });
    }
    return next(request).pipe(tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log(request.url, 'returned a response with status', event.status);
      }
    }), catchError(val =>{
      console.log(val);
      return  throwError(() => new Error('hey'))
    }));
  }

