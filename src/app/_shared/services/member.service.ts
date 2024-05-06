import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first, throwError } from 'rxjs';
import { AppSettings } from 'src/app/_shared/app-settings';
import { TripMember } from 'src/app/_shared/models/trip.model';
import { StorageService } from 'src/app/_shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private API = AppSettings.MEMBER_API_ENDPOINT;
  constructor(private http: HttpClient) { }

  addTrip (tripDto:any): Observable<any>{
    return this.http.post(this.API+'trips/create', tripDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllTripsByLeader(): Observable<any>{
    const userId = StorageService.getUserId();
    return this.http.get(this.API+`trips/user/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }
  getTripById(tripId:number): Observable<any>{
    // const userId = StorageService.getUserId();
    return this.http.get(this.API+`trips/trip/${tripId}`, {
      headers: this.createAuthorizationHeader(),
    })
  }
  // getAllTripsByName(name: any): Observable<any>{
  //   return this.http.get(this.API+`trips/search/${name}`, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  getAllTripsByParticipantId(): Observable<any>{
    const userId = StorageService.getUserId();
    return this.http.get(this.API+`trips/joiner/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  createJoinTrip(joiner:any): Observable<any>{
    return this.http.post(this.API+'joiner/create/', joiner, {
      headers: this.createAuthorizationHeader(),
    })
  }
  cancelJoinTrip(joinerId:number): Observable<any>{
    return this.http.delete(this.API+'joiner/cancel/' + joinerId, {
      headers: this.createAuthorizationHeader(),
    })
  }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization','Bearer ' + StorageService.getToken()
    )
  }

  // delete(id: number) {
  //   return this.http
  //     .delete(this.AUTH_API + id, {
  //       headers: this.createAuthorizationHeader(),
  //     })
  // }


}
