import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, Type } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Ability } from '../../models/ability';

@Injectable({
  providedIn: 'root'
})
export class AbilitiesService {
  public url="http://localhost:3000"
  // crear objeto Http
  public http = inject(HttpClient);
  // obtener todos los tipos
  getAbilities():Observable<Ability[]>{
    return this.http.get<Ability[]>(`${this.url}/abilities`).pipe(
      catchError(this.handleError)
    );
  }

  getAbility(id:number):Observable<Ability[]>{
    return this.http.get<Ability[]>(`${this.url}/abilities/${id}`).pipe(
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
