import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { AppSettings } from 'src/app/_shared/app-settings';
import { Trip } from 'src/app/_shared/models/trip.model';
import { StorageService } from 'src/app/_shared/services/storage.service';

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

  addTripItems(record:Partial<Trip>){
    return this.http.post<Trip>(this.AUTH_API+'trips/create', record, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllTrips(): Observable<any>{
    const userId = StorageService.getUserId();
    return this.http.get(this.AUTH_API+`trips/user/${userId}`, {
      headers: this.createAuthorizationHeader(),
    })
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
    })
  }

  private createAuthorizationHeader(): HttpHeaders{
    console.log(StorageService.getToken());
    return new HttpHeaders().set(
      'Authorization','Bearer ' + StorageService.getToken()
    )
  }
}
