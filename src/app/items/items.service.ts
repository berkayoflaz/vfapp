import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { retry,tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  items = new Subject<any>();
  itemsData = this.items.asObservable();
  constructor(
    private http: HttpClient
  ) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 
  getItems () {
    return this.http.get<any>('https://60c7aa22afc88600179f5826.mockapi.io/api/v1/items')
    .pipe(
      retry(1),
      catchError(this.httpError)
    ).subscribe((response: any) => {
      this.items.next(
        response
      )
    });
  }
  create(params:any): Observable<any> {
    return this.http.post<any>('https://60c7aa22afc88600179f5826.mockapi.io/api/v1/items', params, this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }
  delete (id:any): Observable<any> {
    return this.http.delete<any>(`https://60c7aa22afc88600179f5826.mockapi.io/api/v1/items/${id}`)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }
  httpError(error:any) {
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
