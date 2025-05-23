import { inject, Injectable } from '@angular/core';
import { PokemonTeam } from '../../models/pokemon-team';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonTeamService {
private url=environment.apiUrl;
  // crear objeto Http
  public http = inject(HttpClient);
  /**
   * @description Obtains all pokemonTeam data of all pokemons.
   * @returns an array of PokemonTeam
   */
  getAllPokemonTeam():Observable<PokemonTeam[]>{
    return this.http.get<PokemonTeam[]>(`${this.url}/pokemonTeam`).pipe(
      catchError(this.handleError)
    );
  }
  /**
   * @description Obtains the pokemonTeam data of a pokemon by their pokemonTeam.id.
   * @param id the id of the pokemon
   * @returns an array of PokemonTeam
   */
  getPokemonTeamId(id:number):Observable<PokemonTeam[]>{
    return this.http.get<PokemonTeam[]>(`${this.url}/pokemonTeam/${id}`).pipe(
      catchError(this.handleError)
    )
  }
  /**
   * @description Adds a pokemonTeam to the DB.
   * @param pokemon The pokemonTeam to add to DB.
   * @returns the id of the pokemonTeam inserted.
   */
  postPokemonTeam(pokemon:PokemonTeam):Observable<{id:Number}>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    })
    return this.http.post<{id:Number}>(`${this.url}/pokemonTeam`,pokemon,{headers}).pipe(
      catchError(this.handleError)
    )
  }
  /**
   * @description Updates a pokemonTeam.
   * @param pokemon The pokemonTeam to update.
   * @returns a message indicating whether the update was realized or not
   */
  updatePokemonTeam(pokemon:PokemonTeam):Observable<{message:string}>{
    const headers= new HttpHeaders({
      'Content-Type'  : 'application/json'
    })
    return this.http.put<{message:string}>(`${this.url}/pokemonTeam/${pokemon.id}`,pokemon, {headers}).pipe(
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
      return new Error (errorMessage)
    })
  }
}
