// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Gets the JWT token from localStorage and adds the authentication token to the headers
    const storedToken = localStorage.getItem("id_token");
    const authToken = 'Bearer '+storedToken;
    const authReq = req.clone({
      setHeaders: { Authorization: authToken }
    });

    // Log the request
    // console.log('Outgoing request', authReq);

    // Handle the request and catch errors
    return next.handle(authReq).pipe(
      tap(event => {
        // Log the response
        // console.log('Incoming response', event);
      }),
      catchError(error => {
        // Log and handle the error
        console.error('Error occurred:', error);
        // Swal.fire(`${error.error.message}`,"","error")
        return throwError(error);
      })
    );
  }
}