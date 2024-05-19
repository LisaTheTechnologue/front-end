import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AppSettings } from '../app-settings';
import { StorageService } from './storage.service';
import { PageNotFoundException } from '../exceptions/page-not-found.exception';
import { Trip } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class MemberTripService {

  private API = AppSettings.MEMBER_API_ENDPOINT + 'trips/';
  constructor(private http: HttpClient) { }

  uploadImage(tripId:number, formData:any){
    return this.http.put<any>(this.API+`upload-image/${tripId}`, formData, {
      headers: this.createAuthorizationHeader(),
    })
  }
  createTrip(record: Partial<Trip>) {
    debugger
    return this.http.post<Trip>(this.API+'create', record, {
      headers: this.createAuthorizationHeader(),
    })
  }

  updateTrip (tripId:number,record: Partial<Trip>): Observable<any>{
    return this.http.put<Trip>(this.API+`trip/${tripId}`, record, {
      headers: this.createAuthorizationHeader(),
    })
  }
  
  getAllCreatedTrips(): Observable<any>{
    const userId = StorageService.getUserId();
    return this.http.get(this.API+`user/${userId}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getTripById(tripId:number): Observable<any>{
    // const userId = StorageService.getUserId();
    return this.http.get(this.API+`trip/${tripId}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  changeStatus (tripId:number,status: string): Observable<any>{
    return this.http.put(this.API+`status/${tripId}`, status, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllJoinTrips(): Observable<any>{
    const userId = StorageService.getUserId();
    return this.http.get(this.API+`joiner/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // private handleError(error: HttpErrorResponse) {
  //   // console.log(error);
  //   if (error.status === 404) {
  //     // Redirect to page not found component
  //     return throwError(() => new PageNotFoundException());
  //   }
  //   // Handle other errors here
  //   if (error.error) {
  //     // Extract error details from the response body
  //     const errorMessage = error.error.message || error.error;

  //     // Display the error message to the user (e.g., using a toast notification)
  //     console.error('Error:', errorMessage); // Log for debugging
  //     // You can display the error message in a user-friendly way
  //     return throwError(errorMessage);
  //   } else {
  //     // Handle network or other non-2xx error situations
  //     console.error('An unexpected error occurred!');
  //   }
  //   return throwError(error);
  // }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders({
      'Authorization':'Bearer ' + StorageService.getToken()
    });
  }
}
