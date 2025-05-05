import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Item } from '../../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  public url="http://localhost:3000"
  // crear objeto Http
  public http = inject(HttpClient);
  // obtener todos los tipos
  getItems():Observable<Item[]>{
    return this.http.get<Item[]>(`${this.url}/items`).pipe(
      catchError(this.handleError)
    );
  }

  getItem(id:number):Observable<Item[]>{
    return this.http.get<Item[]>(`${this.url}/items/${id}`).pipe(
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
