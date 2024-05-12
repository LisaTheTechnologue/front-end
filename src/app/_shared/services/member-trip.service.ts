import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AppSettings } from '../app-settings';
import { StorageService } from './storage.service';
import { PageNotFoundException } from '../exceptions/page-not-found.exception';

@Injectable({
  providedIn: 'root'
})
export class MemberTripService {

  private API = AppSettings.MEMBER_API_ENDPOINT + 'trips/';
  constructor(private http: HttpClient) { }

  createTrip (tripDto:any): Observable<any>{
    return this.http.post(this.API+'create', tripDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(catchError(this.handleError));
  }

  getAllTrips(): Observable<any>{
    const userId = StorageService.getUserId();
    return this.http.get(this.API+`user/${userId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(catchError(this.handleError));
  }

  getTripById(tripId:number): Observable<any>{
    // const userId = StorageService.getUserId();
    return this.http.get(this.API+`trip/${tripId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(catchError(this.handleError));
  }

  updateTrip (tripId:number,tripDto:any): Observable<any>{
    return this.http.put(this.API+`update/${tripId}`, tripDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(catchError(this.handleError));
  }

  closeTrip (tripId:number): Observable<any>{
    return this.http.post(this.API+`close/${tripId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(catchError(this.handleError));
  }

  cancelTrip (tripId:number): Observable<any>{
    return this.http.post(this.API+`cancel/${tripId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(catchError(this.handleError));
  }

  getAllJoinTrips(): Observable<any>{
    const userId = StorageService.getUserId();
    return this.http.get(this.API+`joiner/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      // Redirect to page not found component
      return throwError(() => new PageNotFoundException());
    }
    // Handle other errors here
    if (error.error) {
      // Extract error details from the response body
      const errorMessage = error.error.message || error.error;
      const errorCode = error.error.body.status; // Assuming your error object has these properties
      const errorDetail = error.error.body.detail;
      // Display the error message to the user (e.g., using a toast notification)
      console.error('Error:', errorMessage, 'Code:', errorCode, 'Details:', errorDetail); // Log for debugging
      // You can display the error message in a user-friendly way
      return throwError(errorDetail);
    } else {
      // Handle network or other non-2xx error situations
      console.error('An unexpected error occurred!');
    }
    return throwError(error);
  }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization','Bearer ' + StorageService.getToken()
    )
  }
}
