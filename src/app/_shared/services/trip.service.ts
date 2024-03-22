import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { Trip } from '../../trip/_models/trip';
import { AppSettings } from '../app-settings';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private tripsAPI = AppSettings.API_ENDPOINT + 'trips/';

  /*------------------------------------------
  --------------------------------------------
  Http Header Options
  --------------------------------------------
  --------------------------------------------*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  getAll(): Observable<any> {
    return this.httpClient
      .get(this.tripsAPI)
      .pipe(catchError(this.errorHandler));
  }

  search(title: string): Observable<Trip[]> {
    // const url = `<span class="math-inline">\{this\.tripsAPI\}/search?title\=</span>{title}`;
    // return this.httpClient.get<Trip[]>(url); //`${this.tripsAPI}/search?title=${title}`);
    return this.httpClient.get<Trip[]>(`${this.tripsAPI}?title=${title}`);
  }


  getByCity(city: string): Observable<Trip[]> {
    const url = `<span class="math-inline">\{this\.tripsAPI\}/city?city\=</span>{city}`;
    return this.httpClient.get<Trip[]>(url);
  }

  create(trip: Trip): Observable<any> {
    return this.httpClient
      .post(this.tripsAPI , JSON.stringify(trip), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<any> {
    return this.httpClient
      .get(this.tripsAPI+ id)
      .pipe(catchError(this.errorHandler));
  }

  getById(id: number) {
    return this.httpClient.get<Trip>(`${this.tripsAPI}${id}`).pipe(first());
  }

  update(id: number, trip: Trip): Observable<any> {
    return this.httpClient
      .put(this.tripsAPI + id, JSON.stringify(trip), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient
      .delete(this.tripsAPI + id, this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
