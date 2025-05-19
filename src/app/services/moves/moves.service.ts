import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Move } from '../../models/move';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovesService {
private url=environment.apiUrl;
  // crear objeto Http
  public http = inject(HttpClient);
  /**
   * @description Obtains all moves.
   * @returns an array of Move
   */
  getMoves():Observable<Move[]>{
    return this.http.get<Move[]>(`${this.url}/moves`).pipe(
      catchError(this.handleError)
    );
  }
  /**
   * @description Obtains a move by their id.
   * @param id the id of the Move
   * @returns an array of Move
   */
  getMove(id:number):Observable<Move[]>{
    return this.http.get<Move[]>(`${this.url}/moves/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  getPokemonMoves(id:number):Observable<Move[]>{
    return this.http.get<Move[]>(`${this.url}/moves/pokemonMoves/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  postMove(move:Move):Observable<{id:Number}>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    })
    return this.http.post<{id:Number}>(`${this.url}/moves`,move,{headers}).pipe(
      catchError(this.handleError)
    )
  }
  
  updateMove(move:Move):Observable<{message:string}>{
    const headers= new HttpHeaders({
      'Content-Type'  : 'application/json'
    })
    return this.http.put<{message:string}>(`${this.url}/moves/${move.id}`,move, {headers}).pipe(
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
