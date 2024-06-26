import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AppSettings } from '../app-settings';
import { PageNotFoundException } from '../exceptions/page-not-found.exception';
import { StorageService } from './storage.service';
import { Bank, User } from '../models/user.model';

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
  public validateTripCreation(): Observable<any> {
    return this.http
      .get<any>(this.API+'validate-create', {
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

  public updateProfile(profile: FormData): Observable<any> {
    return this.http.put<User>(this.API+'profile', profile, {
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

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }
}
