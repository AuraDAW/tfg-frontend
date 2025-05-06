import { inject, Injectable } from '@angular/core';
import { PokemonTeam } from '../../models/pokemon-team';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonTeamService {
  public url="http://localhost:3000"
  // crear objeto Http
  public http = inject(HttpClient);
  // obtener todos los tipos
  getAllPokemonTeam():Observable<PokemonTeam[]>{
    return this.http.get<PokemonTeam[]>(`${this.url}/pokemonTeam`).pipe(
      catchError(this.handleError)
    );
  }

  getPokemonTeamId(id:number):Observable<PokemonTeam[]>{
    return this.http.get<PokemonTeam[]>(`${this.url}/pokemonTeam/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  postPokemonTeam(pokemon:PokemonTeam):Observable<{id:Number}>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    })
    return this.http.post<{id:Number}>(`${this.url}/pokemonTeam`,pokemon,{headers}).pipe(
      catchError(this.handleError)
    )
  }

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
      new Error (errorMessage)
    })
  }
}
