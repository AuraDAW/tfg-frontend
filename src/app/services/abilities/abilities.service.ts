import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, Type } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Ability } from '../../models/ability';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbilitiesService {
  private url=environment.apiUrl;
  // crear objeto Http
  public http = inject(HttpClient);
  /**
   * @description Obtains all abilities.
   * @returns Array containing all abilities.
   */
  getAbilities():Observable<Ability[]>{
    return this.http.get<Ability[]>(`${this.url}/abilities`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * @description Obtains one ability by its id.
   * @param id the id of the ability
   * @returns array containing all abilities
   */
  getAbility(id:number):Observable<Ability[]>{
    return this.http.get<Ability[]>(`${this.url}/abilities/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  getPokemonAbilities(id:number):Observable<Ability[]>{
    return this.http.get<Ability[]>(`${this.url}/abilities/pokemonAbilities/${id}`).pipe(
      catchError(this.handleError)
    )
  }

    postAbility(ability:Ability):Observable<{id:Number}>{
      const headers = new HttpHeaders({
        'Content-Type':'application/json'
      })
      return this.http.post<{id:Number}>(`${this.url}/abilities`,ability,{headers}).pipe(
        catchError(this.handleError)
      )
    }
    
    updateAbility(ability:Ability):Observable<{message:string}>{
      const headers= new HttpHeaders({
        'Content-Type'  : 'application/json'
      })
      return this.http.put<{message:string}>(`${this.url}/abilities/${ability.id}`,ability, {headers}).pipe(
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
