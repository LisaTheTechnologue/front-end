import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app-settings';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminTripService {

  private API = AppSettings.ADMIN_API_ENDPOINT+'trips/';
  constructor(private http: HttpClient) { }

  getAllTrips(): Observable<any>{
    return this.http.get(this.API, {
      headers: this.createAuthorizationHeader(),
    })
  }
  getTripById(tripId:number): Observable<any>{
    // const userId = StorageService.getUserId();
    return this.http.get(this.API+`trip/${tripId}`, {
      headers: this.createAuthorizationHeader(),
    })
  }
  changeStatus(tripId:number,status: string): Observable<any>{
    return this.http.post(this.API+`status/${tripId}`,status, {
      headers: this.createAuthorizationHeader(),
    })
  }
  // getAllTripsByName(name: any): Observable<any>{
  //   return this.http.get(this.API+`trips/search/${name}`, {
  //     headers: this.createAuthorizationHeader(),
  //   })
  // }
  private createAuthorizationHeader(): HttpHeaders{
    console.log(StorageService.getToken());
    return new HttpHeaders().set(
      'Authorization','Bearer ' + StorageService.getToken()
    )
  }
}
