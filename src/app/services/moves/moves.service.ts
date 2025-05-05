import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Move } from '../../models/move';

@Injectable({
  providedIn: 'root'
})
export class MovesService {
  public url="http://localhost:3000"
  // crear objeto Http
  public http = inject(HttpClient);
  // obtener todos los tipos
  getMoves():Observable<Move[]>{
    return this.http.get<Move[]>(`${this.url}/moves`).pipe(
      catchError(this.handleError)
    );
  }

  getMove(id:number):Observable<Move[]>{
    return this.http.get<Move[]>(`${this.url}/moves/${id}`).pipe(
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
