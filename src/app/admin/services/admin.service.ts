import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/_shared/app-settings';
import { StorageService } from 'src/app/_shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private AUTH_API = AppSettings.ADMIN_API_ENDPOINT;
  constructor(private http: HttpClient) { }

  addCity(cityDto:any): Observable<any>{
    return this.http.post(this.AUTH_API+'city', cityDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllCities(): Observable<any>{
    return this.http.get(this.AUTH_API+'city', {
      headers: this.createAuthorizationHeader(),
    })
  }
  getAllTrips(): Observable<any>{
    return this.http.get(this.AUTH_API+'trips', {
      headers: this.createAuthorizationHeader(),
    })
  }
  getTripById(tripId:number): Observable<any>{
    // const userId = StorageService.getUserId();
    return this.http.get(this.AUTH_API+`trips/trip/${tripId}`, {
      headers: this.createAuthorizationHeader(),
    })
  }
  changeStatus(tripId:number,status:string): Observable<any>{
    return this.http.post(this.AUTH_API+`trips/trip/${tripId}/${status}`, {
      headers: this.createAuthorizationHeader(),
    })
  }
  getAllTripsByName(name: any): Observable<any>{
    return this.http.get(this.AUTH_API+`trips/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  delete(id: number) {
    return this.http
      .delete(this.AUTH_API + id, {
        headers: this.createAuthorizationHeader(),
      })
  }

  search(title: string): Observable<any> {
    // const url = `<span class="math-inline">\{this\.tripsAPI\}/search?title\=</span>{title}`;
    // return this.httpClient.get<Trip[]>(url); //`${this.tripsAPI}/search?title=${title}`);
    return this.http.get(`${this.AUTH_API}/title=${title}`);
  }

  private createAuthorizationHeader(): HttpHeaders{
    console.log(StorageService.getToken());
    return new HttpHeaders().set(
      'Authorization','Bearer ' + StorageService.getToken()
    )
  }
}
