import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../models/user';
import { BehaviorSubject, catchError, Observable, shareReplay, tap, throwError } from 'rxjs';
import moment, {} from "moment";
import { jwtDecode } from "jwt-decode";
import { JWTCustomPayload } from '../../models/jwtcustom-payload';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url=environment.apiUrl;
  // crear objeto Http
  private http = inject(HttpClient);
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  public isLoggedIn$ = this.loggedIn.asObservable();
  private router = inject(Router)
  constructor(private translate: TranslateService) {}

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
    const expiresAt = moment().add(authResult.expiresIn,'second').valueOf();

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));

    this.loggedIn.next(true); //notify to observable that user is logged in (because token was just set)
    console.log('Expires at:', new Date(expiresAt).toLocaleString());
    this.startTokenExpirationWatcher();
  }

  /**
   * @description Logs the user out, by destroying the token in localStorage
   */
  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.loggedIn.next(false); //notify to observable that user logged out, because token was deleted
  }

  /**
   * @description Checks if the user is logged in (token exists in localStorage + not expired) and returns true or false.
   * @returns boolean, true or false
   */
  public isLoggedIn() {
    const token = localStorage.getItem('id_token');
    const expired = this.isTokenExpired();
    console.log('Token:', token);
    console.log('Expired:', expired);
    return token !== null && !expired;
  }
  /**
   * @description Obtains the expiration date for JWT token as set in "setSession()"
   * @returns the expiration time if token exists, 0 if it does not
   */
  getExpiration(){
    const expiration = localStorage.getItem("expires_at");
    if(!expiration){
      return 0;
    }
    const parsed=JSON.parse(expiration);
    return typeof parsed==='number' ? parsed:0;
  }
  /**
   * @description Checks if the token has expired or not
   * @returns boolean, true if expired and false if not
   */
  isTokenExpired(){
    const expiration = this.getExpiration()
    if(!expiration){
      return true; //if no token then user is obviously logged out
    }
    const abc =  moment().valueOf() > expiration;
    console.log(abc);
    return abc;
  }

  startTokenExpirationWatcher() {
    const expiresAt = this.getExpiration();
    const now = moment().valueOf();
    const timeout = expiresAt - now;

    if (timeout > 0) {
      setTimeout(() => {
        this.logout();
        // this.router.navigateByUrl("/login")
        this.translate.get(["login.expired.title","login.expired.text","login.login"]).subscribe((translations)=>{
          Swal.fire({
          title:translations["login.expired.title"],
          text:translations["login.expired.text"],
          icon:"info",
          confirmButtonText:translations["login.login"]
        }).then((result)=>{
          if(result.isConfirmed){
            this.router.navigateByUrl("/login")
          }
        })
        })
      }, timeout);
    }
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
