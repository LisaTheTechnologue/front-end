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
export class MemberPaymentService {
  private API = AppSettings.MEMBER_API_ENDPOINT + 'payment/';
  constructor(public http: HttpClient, public router: Router) {}

  public getByTripId(tripId: number): Observable<any> {
    return this.http
      .get<any>(this.API+'list?tripId=' + tripId, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }

  public getById(paymentId: number): Observable<any> {
    return this.http
      .get<any>(this.API + paymentId, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }

  public create(chat: any): Observable<any> {
    return this.http.post<any>(this.API, chat, {
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
