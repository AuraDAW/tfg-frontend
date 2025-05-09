import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Type } from '../../models/type';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
private url=environment.apiUrl;
  // crear objeto Http
  public http = inject(HttpClient);
  /**
   * @description Obtains all types.
   * @returns an array of Type
   */
  getTypes():Observable<Type[]>{
    return this.http.get<Type[]>(`${this.url}/types`).pipe(
      catchError(this.handleError)
    );
  }
  /**
   * @description Obtains a type by their id
   * @param id the id of the type
   * @returns a Type object
   */
  getType(id:number):Observable<Type>{
    return this.http.get<Type>(`${this.url}/types/${id}`).pipe(
      catchError(this.handleError)
    )
  }
  /**
   * @description Obtains all types of a pokemonData.
   * @param id the id of the pokemonData
   * @returns an array of Type
   */
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
