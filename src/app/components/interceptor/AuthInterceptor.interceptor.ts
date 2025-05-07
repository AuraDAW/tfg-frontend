// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add an authentication token to the request headers
    const storedToken = localStorage.getItem("id_token");
    const authToken = 'Bearer '+storedToken;
    const authReq = req.clone({
      setHeaders: { Authorization: authToken }
    });

    // Log the request
    console.log('Outgoing request', authReq);

    // Handle the request and catch errors
    return next.handle(authReq).pipe(
      tap(event => {
        // Log the response
        console.log('Incoming response', event);
      }),
      catchError(error => {
        // Log and handle the error
        console.error('Error occurred:', error);
        return throwError(error);
      })
    );
  }
}