import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../models/user';
import { catchError, Observable, shareReplay, tap, throwError } from 'rxjs';
import moment, {} from "moment";
import { jwtDecode } from "jwt-decode";
import { JWTCustomPayload } from '../../models/jwtcustom-payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url="http://localhost:3000"
  // crear objeto Http
  private http = inject(HttpClient);

  login(user: User) {
    return this.http.post<{ idToken: string; expiresIn: number }>(`${this.url}/login`, user)
    .pipe(
      tap(res => this.setSession(res)),
      shareReplay()
    );
  }
  private setSession(authResult: { idToken: any; expiresIn: any; }) {
    console.log(authResult);
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    // return moment().isBefore(this.getExpiration());
    return localStorage.getItem('id_token') !== null;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }
  
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
