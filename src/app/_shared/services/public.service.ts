import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AppSettings } from '../app-settings';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { PageNotFoundException } from '../exceptions/page-not-found.exception';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private API = AppSettings.PUBLIC_ENDPOINT;
  constructor(public http: HttpClient, public router: Router) {}

  getAllCities(): Observable<any>{
    return this.http.get(this.API+'cities')
    // .pipe(catchError(this.handleError));
  }

  public getLatestTrips(): Observable<any> {
    return this.http.get(this.API + 'trips/latest')
    // .pipe(catchError(this.handleError));
  }
  public getTopUsers(): Observable<any> {
    return this.http.get(this.API + 'profile/top')
    // .pipe(catchError(this.handleError));
  }
  public getTopFeedbacks(): Observable<any> {
    return this.http.get(this.API + 'feedbacks/top')
    // .pipe(catchError(this.handleError));
  }

  public getAllTrips(): Observable<any> {
    return this.http.get(this.API + 'trips');
    // .pipe(catchError(this.errorHandler));
  }
  public getByTripId(tripId: number): Observable<any> {
    return this.http.get(this.API + 'trip/details?tripId=' + tripId);
    // .pipe(catchError(this.errorHandler));
  }
  public getFeedbacksByTripId(tripId: number): Observable<any> {
    return this.http.get(this.API + 'feedbacks?tripId=' + tripId)
    // .pipe(catchError(this.handleError));
  }
  public getAllJoinerByTripId(tripId: number): Observable<any> {
    return this.http.get(this.API + 'joiners?tripId=' + tripId);
    // .pipe(catchError(this.errorHandler));
  }

  public getByUserId(userid: any): Observable<any> /* profile */ {
    return this.http.get<User>(
      this.API + 'profile?userId=' + userid
    )
  }

  public getTripsByLeaderId(leaderId: any): Observable<any> {
    return this.http
      .get(this.API + 'profile/trips?leaderId=' + leaderId);
  }

  public submitContact(contactForm:any): Observable<any>{
    return this.http.post<any>(this.API+'contact', contactForm);
  }

  public createTrip(record: FormData): Observable<any> {
    return this.http.post<any>(this.API + 'trip-create', record)
  }

  sendTemporaryPassword(email: string) {
    return this.http.post(this.API+'forgot-password', email);
  }
}
