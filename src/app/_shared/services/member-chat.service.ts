import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AppSettings } from '../app-settings';
import { PageNotFoundException } from '../exceptions/page-not-found.exception';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class MemberChatService {
  private CHAT_ENDPOINT = AppSettings.MEMBER_API_ENDPOINT + 'chat';
  constructor(public http: HttpClient, public router: Router) {}

  public get(tripId: any): Observable<any> {
    return this.http
      .get<any>(this.CHAT_ENDPOINT+'?tripId=' + tripId, {
        headers: this.createAuthorizationHeader(),
      })
      // .pipe(catchError(this.handleError));
  }

  public create(chat: any): Observable<any> {
    return this.http.post<any>(this.CHAT_ENDPOINT, chat, {
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

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }
}
