import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { AppSettings } from '../app-settings';
import { Trip } from '../models/trip.model';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private TRIPS_API = AppSettings.TRIPS_API_ENDPOINT;

  constructor(private http: HttpClient) {}

  getLatestTrips(): Observable<any> {
    return this.http
      .get(this.TRIPS_API + 'latest')
      .pipe(catchError(this.errorHandler));
  }


  getAll(): Observable<any> {
    return this.http
      .get(this.TRIPS_API)
      .pipe(catchError(this.errorHandler));
  }

  getByCity(city: string): Observable<Trip[]> {
    const url = `<span class="math-inline">\{this\.tripsAPI\}/city?city\=</span>{city}`;
    return this.http.get<Trip[]>(url);
  }

  getById(tripId:number): Observable<any>{
    // const userId = StorageService.getUserId();
    return this.http
      .get(this.TRIPS_API + 'tripId/' + tripId)
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
