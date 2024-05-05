import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AppSettings } from '../app-settings';
import { PageNotFoundException } from '../exceptions/page-not-found.exception';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MemberUserService {

  private API = AppSettings.MEMBER_API_ENDPOINT ;
  constructor(public http: HttpClient, public router: Router) {}

  public getProfile(): Observable<any> {
    const userId = StorageService.getUserId();
    return this.http
      .get<any>(this.API+'profile/' + userId, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }

  public updateProfile(profile: any): Observable<any> {
    const userId = StorageService.getUserId();
    return this.http.put<any>(this.API+'profile/' + userId, profile, {
      headers: this.createAuthorizationHeader(),
    })
    .pipe(catchError(this.handleError));
  }

  public getPaymentProfile(tripId: any): Observable<any> {
    return this.http
      .get<any>(this.API+'payment/' + tripId, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      // Redirect to page not found component
      return throwError(() => new PageNotFoundException());
    }
    // Handle other errors here
    return throwError(error);
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }
}
