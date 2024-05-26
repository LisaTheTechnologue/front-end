import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppSettings } from '../app-settings';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminCitiesService {

  private API = AppSettings.ADMIN_API_ENDPOINT + 'cities';
  constructor(public http: HttpClient, public router: Router) {}
  public uploadCSV(formData: any): Observable<any> {
    return this.http.post<any>(this.API, formData, {
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
