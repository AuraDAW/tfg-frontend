import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, Type } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import { Team } from '../../models/team';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url=environment.apiUrl;
  // crear objeto Http
  public http = inject(HttpClient);

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/users`).pipe(
      catchError(this.handleError)
    );
  }

  getUser(id:number):Observable<User>{
    return this.http.get<User>(`${this.url}/users/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  getTeamCreator(id:number):Observable<User>{
    return this.http.get<User>(`${this.url}/users/teamCreator/${id}`).pipe(
      catchError(this.handleError)
    )
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
