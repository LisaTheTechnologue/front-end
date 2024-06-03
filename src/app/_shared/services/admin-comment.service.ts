import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app-settings';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminCommentService {
  private API = AppSettings.ADMIN_API_ENDPOINT+'comment/';
  constructor(private http: HttpClient) { }
  
  public create (data: any): Observable<any> {
    return this.http.post(this.API+'create',data, {
      headers: this.createAuthorizationHeader(),
    })
    // .pipe(catchError(this.handleError));
  }
  public update (data: any): Observable<any> {
    return this.http.put(this.API+'update',data, {
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
