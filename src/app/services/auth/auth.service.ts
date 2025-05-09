import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../models/user';
import { catchError, Observable, shareReplay, tap, throwError } from 'rxjs';
import moment, {} from "moment";
import { jwtDecode } from "jwt-decode";
import { JWTCustomPayload } from '../../models/jwtcustom-payload';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url=environment.apiUrl;
  // crear objeto Http
  private http = inject(HttpClient);
  /**
   * @description Receives a user and will try to login with their email and password.
   * @param user the user that will try to login
   * @returns 
   */
  login(user: User) {
    return this.http.post<{ idToken: string; expiresIn: number }>(`${this.url}/login`, user)
    .pipe(
      tap(res => this.setSession(res)),
      shareReplay()
    );
  }
  /**
   * @description Receives a user and will try to register it and add him to the DB.
   * @param user The user to register
   * @returns 
   */
  register(user: User): Observable<{ id: Number }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post<{ id: Number }>(`${this.url}/register`, user, { headers }).pipe(
      catchError(this.handleError)
    )
  }

  /**
   * @description Will set the session for the logged in user, adding the JWT token to localStorage.
   * @param authResult The result from the login() method.
   */
  private setSession(authResult: { idToken: any; expiresIn: any; }) {
    console.log(authResult);
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  /**
   * @description Logs the user out, by destroying the token in localStorage
   */
  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  /**
   * @description Checks if the user is logged in (token exists in localStorage) and returns true or false.
   * @returns boolean, true or false
   */
  public isLoggedIn() {
    // return moment().isBefore(this.getExpiration());
    return localStorage.getItem('id_token') !== null;
  }
  /**
   * @description Obtains the token from localStorage, if it exists it will decode it and obtain the userId.
   * @returns The id of the currently logged in user.
   */  
  getUserIdFromToken(){
    const token = localStorage.getItem("id_token");
    // if token hasnt been set, return null
    if(!token){
      return null;
    }

    try{
      // jwtDecode returns a JWTPayload object, which does not have custom attributes so you cannot obtain userId. 
      // to fix this, i created an interface with everything the payload should return so i can obtain userId without issue
      const decodedToken = jwtDecode<JWTCustomPayload>(token)
      return decodedToken.userId;
    }catch(error){
      console.log(error);
      return null;
    }
  }

  handleError(err:HttpErrorResponse){
    let errorMessage:string="";
    if(err.error instanceof ErrorEvent ){
      errorMessage=`Error del cliente:${err.error.message}`;
    }else{
      errorMessage=`Error del servidor:${err.error.message}`;
    }
    return throwError(()=>{
      new Error (errorMessage)
    })
  }
}
