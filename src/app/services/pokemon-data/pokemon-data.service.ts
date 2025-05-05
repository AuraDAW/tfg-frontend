import { inject, Injectable } from '@angular/core';
import { PokemonData } from '../../models/pokemon-data';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Move } from '../../models/move';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {
  public url="http://localhost:3000"
  // crear objeto Http
  public http = inject(HttpClient);
  // obtener todos los tipos
  getPokemonData():Observable<PokemonData[]>{
    return this.http.get<PokemonData[]>(`${this.url}/pokemonData`).pipe(
      catchError(this.handleError)
    );
  }

  getPokemonDataId(id:number):Observable<PokemonData[]>{
    return this.http.get<PokemonData[]>(`${this.url}/pokemonData/${id}`).pipe(
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
