import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { AppSettings } from '../../_shared/app-settings';
import { Trip } from '../../_shared/models/trip.model';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private TRIPS_API = AppSettings.TRIPS_API_ENDPOINT;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http
      .get(this.TRIPS_API)
      .pipe(catchError(this.errorHandler));
  }

  search(title: string): Observable<any> {
    // const url = `<span class="math-inline">\{this\.tripsAPI\}/search?title\=</span>{title}`;
    // return this.httpClient.get<Trip[]>(url); //`${this.tripsAPI}/search?title=${title}`);
    return this.http.get<any>(`${this.TRIPS_API}?title=${title}`);
  }


  getByCity(city: string): Observable<Trip[]> {
    const url = `<span class="math-inline">\{this\.tripsAPI\}/city?city\=</span>{city}`;
    return this.http.get<Trip[]>(url);
  }

  find(id: number): Observable<any> {
    return this.http
      .get(this.TRIPS_API+ id)
      .pipe(catchError(this.errorHandler));
  }

  getById(tripId:number): Observable<any>{
    // const userId = StorageService.getUserId();
    return this.http.get(this.TRIPS_API + tripId);
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
