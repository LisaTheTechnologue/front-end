import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first, throwError } from 'rxjs';
import { AppSettings } from 'src/app/_shared/app-settings';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { TripMember } from '../../_shared/models/trip-member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private AUTH_API = AppSettings.MEMBER_API_ENDPOINT;
  constructor(private http: HttpClient) { }

  getAllCities(): Observable<any>{
    return this.http.get(this.AUTH_API+'city', {
      headers: this.createAuthorizationHeader(),
    })
  }

  addTrip (tripDto:any): Observable<any>{
    return this.http.post(this.AUTH_API+'trips/create', tripDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllTrips(): Observable<any>{
    const userId = StorageService.getUserId();
    return this.http.get(this.AUTH_API+`trips/user/${userId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError((err) => {
      console.log('error caught in service')
      console.error(err);
      return throwError(err);
    }))
  }
  getTripById(tripId:number): Observable<any>{
    // const userId = StorageService.getUserId();
    return this.http.get(this.AUTH_API+`trips/trip/${tripId}`, {
      headers: this.createAuthorizationHeader(),
    })
  }
  getAllTripsByName(name: any): Observable<any>{
    return this.http.get(this.AUTH_API+`trips/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError((err) => {
      console.log('error caught in service')
      console.error(err);
      return throwError(err);
    }))
  }
  getAllJoinTrips(): Observable<any>{
    const userId = StorageService.getUserId();
    return this.http.get(this.AUTH_API+`trips/join-trip-list/${userId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError((err) => {
      console.log('error caught in service')
      console.error(err);
      return throwError(err);
    }))
  }
  joinTrip(tripMember:any): Observable<any>{
    return this.http.post(this.AUTH_API+'trips/join-trip', tripMember, {
      headers: this.createAuthorizationHeader(),
    })
  }
  revokeJoinTrip(tripNo:number): Observable<any>{
    const user = StorageService.getUserId();
    const tripMember: TripMember = {
      tripId: tripNo,
      userId: +user,
      userName: ''
      };
    return this.http.post(this.AUTH_API+'trips/revoke-join-trip', tripMember, {
      headers: this.createAuthorizationHeader(),
    })
  }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization','Bearer ' + StorageService.getToken()
    )
  }

  delete(id: number) {
    return this.http
      .delete(this.AUTH_API + id, {
        headers: this.createAuthorizationHeader(),
      })
  }


}
