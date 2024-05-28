import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AppSettings } from '../app-settings';
import { StorageService } from './storage.service';
import { PageNotFoundException } from '../exceptions/page-not-found.exception';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MemberJoinerService {

  private API = AppSettings.MEMBER_API_ENDPOINT + 'joiner/';
  constructor(private http: HttpClient, private dialog: MatDialog) { }

  // createJoin (tripDto:any): Observable<any>{
  //   return this.http.post(this.API+'create', tripDto, {
  //     headers: this.createAuthorizationHeader(),
  //   }).pipe(catchError(this.handleError));
  // }

  checkJoiner(tripDto:any): Observable<any>{
    const userId = StorageService.getUserId();
    return this.http.post(this.API+'check',tripDto, {
      headers: this.createAuthorizationHeader(),
    })
    // .pipe(catchError(this.handleError));
  }

  getAllByTripId(tripId:number): Observable<any>{
    // const userId = StorageService.getUserId();
    return this.http.get(this.API+`joiner-list?tripId=${tripId}`, {
      headers: this.createAuthorizationHeader(),
    })
    // .pipe(catchError(this.handleError));
  }

  getAllPendingByLeaderId(): Observable<any>{
    const leaderId = StorageService.getUserId();
    return this.http.get(this.API+`request-list`
    // ?leaderId=${leaderId}`
    , {
      headers: this.createAuthorizationHeader(),
    })
    // .pipe(catchError(this.handleError));
  }

  reject (joinerId:number): Observable<any>{
    return this.http.put(this.API+`update/${joinerId}`,'reject', {
      headers: this.createAuthorizationHeader(),
    })
    // .pipe(catchError(this.handleError));
  }

  approve (joinerId:number): Observable<any>{
    return this.http.put(this.API+`update/${joinerId}`,'approve', {
      headers: this.createAuthorizationHeader(),
    })
    // .pipe(catchError(this.handleError));
  }

  cancel (joinerId:number): Observable<any>{
    return this.http.delete(this.API+`cancel/${joinerId}`, {
      headers: this.createAuthorizationHeader(),
    })
    // .pipe(catchError(this.handleError));
  }
  remove (joinerId:any): Observable<any>{
    return this.http.delete(this.API+`remove?joinerId=${joinerId}`, {
      headers: this.createAuthorizationHeader(),
    })
    // .pipe(catchError(this.handleError));
  }
  getParticipantListByTripIdAndJoinerStatus(tripId:number): Observable<any>{
    // const userId = StorageService.getUserId();
    return this.http.get(this.API+`list?tripId=${tripId}`, {
      headers: this.createAuthorizationHeader(),
    })
    // .pipe(catchError(this.handleError));
  }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.status === 404) {
  //     // Redirect to page not found component
  //     return throwError(() => new PageNotFoundException());
  //   }
  //   // Handle other errors here
  //   if (error.error) {
  //     // Extract error details from the response body
  //     const errorMessage = error.error.message || error.error;
  //     const errorCode = error.error.body.status; // Assuming your error object has these properties
  //     const errorDetail = error.error.body.detail;
  //     // Display the error message to the user (e.g., using a toast notification)
  //     console.error('Error:', errorMessage, 'Code:', errorCode, 'Details:', errorDetail); // Log for debugging
  //     // You can display the error message in a user-friendly way
  //     return throwError(errorDetail);
  //   } else {
  //     // Handle network or other non-2xx error situations
  //     console.error('An unexpected error occurred!');
  //   }
  //   return throwError(error);
  // }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization','Bearer ' + StorageService.getToken()
    )
  }
}
