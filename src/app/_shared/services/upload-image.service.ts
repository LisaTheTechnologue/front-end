import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppSettings } from '../app-settings';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private API = AppSettings.MEMBER_API_ENDPOINT + "images";
  constructor(public http: HttpClient, public router: Router) {}

  public getAllByParentId(id:number): Observable<any> {
    return this.http
      .get<any>(this.API+'?parentId=' + id, {
        headers: this.createAuthorizationHeader(),
      })
      // .pipe(catchError(this.handleError));
  }

  uploadImage(id:number,formData:any){
    const userId = StorageService.getUserId();
    return this.http.post<any>(this.API+'?parentId=' + id, formData, {
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
