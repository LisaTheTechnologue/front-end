import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AppSettings } from '../app-settings';
import { StorageService } from './storage.service';
import { PageNotFoundException } from '../exceptions/page-not-found.exception';

@Injectable({
  providedIn: 'root'
})
export class MemberJoinerService {

  private API = AppSettings.MEMBER_API_ENDPOINT + 'joiner/';
  constructor(private http: HttpClient) { }

  create (tripDto:any): Observable<any>{
    return this.http.post(this.API+'create', tripDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(catchError(this.handleError));
  }

  // getAllByTripId(): Observable<any>{
  //   const userId = StorageService.getUserId();
  //   return this.http.get(this.API+`list/${userId}`, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  getAllByTripId(tripId:number): Observable<any>{
    // const userId = StorageService.getUserId();
    return this.http.get(this.API+`list?tripId=${tripId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(catchError(this.handleError));
  }

  getAllPendingByLeaderId(leaderId:number): Observable<any>{
    // const userId = StorageService.getUserId();
    return this.http.get(this.API+`list?leaderId=${leaderId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(catchError(this.handleError));
  }

  reject (joinerId:number): Observable<any>{
    return this.http.put(this.API+`update/${joinerId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(catchError(this.handleError));
  }

  approve (joinerId:number): Observable<any>{
    return this.http.put(this.API+`approve/${joinerId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(catchError(this.handleError));
  }

  cancel (joinerId:number): Observable<any>{
    return this.http.put(this.API+`cancel/${joinerId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(catchError(this.handleError));
  }

  getParticipantListByTripIdAndJoinerStatus(tripId:number): Observable<any>{
    // const userId = StorageService.getUserId();
    return this.http.get(this.API+`list?tripId=${tripId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      // Redirect to page not found component
      return throwError(() => new PageNotFoundException());
    }
    // Handle other errors here
    return throwError(error);
  }
  // getAllTripsByName(name: any): Observable<any>{
  //   return this.http.get(this.API+`trips/search/${name}`, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  // getAllJoinTrips(): Observable<any>{
  //   const userId = StorageService.getUserId();
  //   return this.http.get(this.API+`trips/join-trip-list/${userId}`, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization','Bearer ' + StorageService.getToken()
    )
  }
}
