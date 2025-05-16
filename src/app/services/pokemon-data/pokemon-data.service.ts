import { inject, Injectable } from '@angular/core';
import { PokemonData } from '../../models/pokemon-data';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Move } from '../../models/move';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {
private url=environment.apiUrl;
  // crear objeto Http
  public http = inject(HttpClient);
  /**
   * @description Obtains the pokemonData of all pokemons.
   * @returns an array of PokemonData
   */
  getPokemonData():Observable<PokemonData[]>{
    return this.http.get<PokemonData[]>(`${this.url}/pokemonData`).pipe(
      catchError(this.handleError)
    );
  }
  /**
   * @description Obtains the pokemonData of a pokemon by their id.
   * @param id the id of the pokemon
   * @returns an array of PokemonData
   */
  getPokemonDataId(id:number):Observable<PokemonData[]>{
    return this.http.get<PokemonData[]>(`${this.url}/pokemonData/${id}`).pipe(
      catchError(this.handleError)
    )
  }
  /**
   * @description Obtains the pokemonData of all pokemons inside a team.
   * @param id the id of the team
   * @returns an array of PokemonData
   */
  getPokemonDataFromTeam(id:number):Observable<PokemonData[]>{
    return this.http.get<PokemonData[]>(`${this.url}/pokemonData/getData/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  postPokemonData(pokemon:PokemonData):Observable<{id:Number}>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    })
    return this.http.post<{id:Number}>(`${this.url}/pokemonData`,pokemon,{headers}).pipe(
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
