import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Item } from '../../models/item';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private url=environment.apiUrl;
  // crear objeto Http
  public http = inject(HttpClient);
  /**
   * @description Obtains all items.
   * @returns an item array
   */
  getItems():Observable<Item[]>{
    return this.http.get<Item[]>(`${this.url}/items`).pipe(
      catchError(this.handleError)
    );
  }
  /**
   * @description Obtains an item by their id.
   * @param id The id of the item.
   * @returns an array of Item
   */
  getItem(id:number):Observable<Item[]>{
    return this.http.get<Item[]>(`${this.url}/items/${id}`).pipe(
      catchError(this.handleError)
    )
  }
  
  postItem(item: Item): Observable<{ id: Number }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post<{ id: Number }>(`${this.url}/items`, item, { headers }).pipe(
      catchError(this.handleError)
    )
  }

  updateItem(item: Item): Observable<{ message: string }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.put<{ message: string }>(`${this.url}/items/${item.id}`, item, { headers }).pipe(
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
