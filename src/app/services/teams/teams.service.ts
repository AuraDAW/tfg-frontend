import { inject, Injectable } from '@angular/core';
import { Team } from '../../models/team';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
private url=environment.apiUrl;
  // crear objeto Http
  public http = inject(HttpClient);
  /**
   * @description Obtains all teams. Not really used when getTeamsUser exists.
   * @returns an array of Team
   */
  getTeams():Observable<Team[]>{
    return this.http.get<Team[]>(`${this.url}/teams`).pipe(
      catchError(this.handleError)
    );
  }
  /**
   * @description Obtains all teams of a certain user.
   * @param id the id of the user
   * @returns an array of Team
   */
  getTeamsUser(id:number):Observable<Team[]>{
    return this.http.get<Team[]>(`${this.url}/teams/userId/${id}`).pipe(
      catchError(this.handleError)
    )
  }
  /**
   * @description Obtains a team by their id.
   * @param id the id of the team
   * @returns an array of Team
   */
  getTeam(id:number):Observable<Team[]>{
    return this.http.get<Team[]>(`${this.url}/teams/${id}`).pipe(
      catchError(this.handleError)
    )
  }


  postPokemonTeam(team:Team):Observable<{id:Number}>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    })
    return this.http.post<{id:Number}>(`${this.url}/teams`,team,{headers}).pipe(
      catchError(this.handleError)
    )
  }

  updatePokemonTeam(team:Team):Observable<{message:string}>{
    const headers= new HttpHeaders({
      'Content-Type'  : 'application/json'
    })
    return this.http.put<{message:string}>(`${this.url}/teams/${team.id}`,team, {headers}).pipe(
      catchError(this.handleError)
    )
  }

  deleteTeam(id:Number):Observable<{message:string}>{
    return this.http.delete<{message:string}>(`${this.url}/teams/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  addPokemonToTeam(teamId:number, pokemonId:Number):Observable<{message:string}>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    })
    const body = { id: pokemonId };
    return this.http.post<{message:string}>(`${this.url}/teams/addPokemon/${teamId}`,body,{headers}).pipe(
      catchError(this.handleError)
    )
  }

  favoriteTeam(teamId:number):Observable<{message:string}>{
    return this.http.get<{message:string}>(`${this.url}/teams/favoriteTeam/${teamId}`).pipe(
      catchError(this.handleError)
    )
  }

  isFavorited(teamId: number): Observable<boolean> {
  return this.getTeam(teamId).pipe(
    map(data => data[0].favorited == true),
    catchError(err => {
      console.error(err);
      return of(false); // Default to false on error
    })
  );
}

getFavoritedTeams():Observable<Team[]>{
    return this.http.get<Team[]>(`${this.url}/teams/favoriteTeam`).pipe(
      catchError(this.handleError)
    );
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
