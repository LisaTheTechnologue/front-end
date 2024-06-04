import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AppSettings } from '../app-settings';
import { PageNotFoundException } from '../exceptions/page-not-found.exception';
import { StorageService } from './storage.service';
import { Bank } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MemberUserService {

  private API = AppSettings.MEMBER_API_ENDPOINT ;
  constructor(public http: HttpClient, public router: Router) {}

  public getProfile(): Observable<any> {
    return this.http
      .get<any>(this.API+'profile', {
        headers: this.createAuthorizationHeader(),
      })
      // .pipe(catchError(this.handleError));
  }

  public getBanks(): Observable<Bank[]> {
    const url = 'https://api.vietqr.io/v2/banks';
    return this.http.get<any>(url) // Assuming the API response structure
      .pipe(
        map(response => response.data.map(bank => ({ name: bank.name, shortName: bank.shortName })))
      );
  }

  public updateProfile(profile: any): Observable<any> {
    const userId = StorageService.getUserId();
    return this.http.put<any>(this.API+'profile', profile, {
      headers: this.createAuthorizationHeader(),
    })
    // .pipe(catchError(this.handleError));
  }

  uploadImage(formData:any){
    const userId = StorageService.getUserId();
    return this.http.put<any>(this.API+`upload-image`, formData, {
      headers: this.createAuthorizationHeader(),
    })
    // .pipe(catchError(this.handleError));
  }

  public changePassword(passwordChange: any): Observable<any> {
    const userId = StorageService.getUserId();
    return this.http.post<any>(this.API+'change-password', passwordChange, {
      headers: this.createAuthorizationHeader(),
    })
    // .pipe(catchError(this.handleError));
  }

  // public getPaymentProfileByUserId(userId: any): Observable<any> {
  //   return this.http
  //     .get<any>(this.API+'payment-profile/' + userId, {
  //       headers: this.createAuthorizationHeader(),
  //     })
      // .pipe(catchError(this.handleError));
  // }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.status === 404) {
  //     // Redirect to page not found component
  //     return throwError(() => new PageNotFoundException());
  //   }
  //   let errorMessage = '';
  //   // Handle other errors here
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side or network error occurred. Handle it accordingly.
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     errorMessage = `Error: ${error.error}`;
      
  //   }
  //   return throwError(errorMessage);
  // }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }
}
