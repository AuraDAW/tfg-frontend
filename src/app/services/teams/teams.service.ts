<<<<<<< HEAD
import { inject, Injectable } from '@angular/core';
import { Team } from '../../models/team';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
=======
import { Injectable } from '@angular/core';
>>>>>>> b305fe81c8d3ca6dac897524b65c84cc5796ad4f

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
<<<<<<< HEAD
  public url="http://localhost:3000"
  // crear objeto Http
  public http = inject(HttpClient);
  // obtener todos los tipos
  getTeams():Observable<Team[]>{
    return this.http.get<Team[]>(`${this.url}/teams`).pipe(
      catchError(this.handleError)
    );
  }

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
=======

  constructor() { }
>>>>>>> b305fe81c8d3ca6dac897524b65c84cc5796ad4f
}
