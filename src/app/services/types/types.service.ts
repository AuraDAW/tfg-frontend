import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Type } from '../../models/type';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  public url="http://localhost:3000"
  // crear objeto Http
  public http = inject(HttpClient);
  // obtener todos los tipos
  getTypes():Observable<Type[]>{
    return this.http.get<Type[]>(`${this.url}/types`).pipe(
      catchError(this.handleError)
    );
  }

  getType(id:number):Observable<Type[]>{
    return this.http.get<Type[]>(`${this.url}/types/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  getPokemonDataTypes(id:number):Observable<Type[]>{
    return this.http.get<Type[]>(`${this.url}/types/getTypes/${id}`).pipe(
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
