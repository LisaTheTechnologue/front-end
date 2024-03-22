import { Injectable } from '@angular/core';
import { AppSettings } from '../app-settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, first, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripParticipantsService {

  private TRIPS_API_ENDPOINT = AppSettings.TRIPS_API_ENDPOINT;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  addById(id:number, participants:any): Observable<any> {
    return this.httpClient.post(`${this.TRIPS_API_ENDPOINT}/${id}/edits/participants`, JSON.stringify(participants), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get(`${this.TRIPS_API_ENDPOINT}/${id}/edits/participants`).pipe(first());
  }

  updateById(id:number, participants:any): Observable<any> {

    return this.httpClient.put(`${this.TRIPS_API_ENDPOINT}/${id}/edits/participants`, JSON.stringify(participants), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id:number){
    return this.httpClient.delete(`${this.TRIPS_API_ENDPOINT}/${id}/edits/participants`, this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
