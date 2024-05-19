import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AppSettings } from '../app-settings';
import { PageNotFoundException } from '../exceptions/page-not-found.exception';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  private API = AppSettings.ADMIN_API_ENDPOINT+'users/';
  constructor(private http: HttpClient) { }
  public updatePassword(passwordChange: any): Observable<any> {
    const userId = StorageService.getUserId();
    return this.http.post<any>(this.API+'change-password/' + userId, passwordChange, {
      headers: this.createAuthorizationHeader(),
    })
    .pipe(catchError(this.handleError));
  }
  updateStatus(id: any, data: any): Observable<any> {
    return this.http.put(this.API+`${id}`,data, {
      headers: this.createAuthorizationHeader(),
    }).pipe(catchError(this.handleError));
  }
  searchUser(searchText: any): Observable<User[]> {
    return this.http.get<User[]>(this.API+`search?searchText=${searchText}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(catchError(this.handleError));
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

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }
}
