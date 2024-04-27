import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AppSettings } from '../app-settings';
import { User, PublicProfile } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private PUBLIC_ENDPOINT = AppSettings.PUBLIC_ENDPOINT;
  constructor(public http: HttpClient, public router: Router) {}

  public getProfile(userid: any): Observable<PublicProfile> /* profile */ {
    return this.http.get<PublicProfile>(
      this.PUBLIC_ENDPOINT + 'profile?leaderId=' + userid
    );
  }

  public getProfileWithPaymentInfo(
    userid: any
  ): Observable<User> /* null route */ {
    return this.http.get<User>(
      this.PUBLIC_ENDPOINT + 'profile?leaderId=' + userid
    );
  }

  public getPublicProfile(
    leaderId: any
  ): Observable<PublicProfile> /* profile */ {
    return this.http.get<PublicProfile>(
      this.PUBLIC_ENDPOINT + 'profile?leaderId=' + leaderId
    );
  }

  public getLatestTrips(): Observable<any> {
    return this.http.get(this.PUBLIC_ENDPOINT + 'trips/latest');
    // .pipe(catchError(this.errorHandler));
  }

  public getAllTrips(): Observable<any> {
    return this.http.get(this.PUBLIC_ENDPOINT + 'trips');
    // .pipe(catchError(this.errorHandler));
  }

  public getById(tripId: number): Observable<any> {
    // http://localhost:8080/public/trip?tripId=1
    return this.http
      .get(this.PUBLIC_ENDPOINT + 'trip?tripId=' + tripId);
  }

  public getTripsByLeaderId(leaderId: any): Observable<any> {
    return this.http
      .get(this.PUBLIC_ENDPOINT + 'profile/trips?leaderId=' + leaderId);
  }
}
