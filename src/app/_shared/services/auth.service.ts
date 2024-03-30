import { Injectable } from '@angular/core';
import { AppSettings } from '../app-settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_API = AppSettings.APP_ENDPOINT;
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .post(this.AUTH_API + 'authenticate', body, { headers, observe: 'response' })
      .pipe(
        map((res) => {
          const token = res.headers.get('Authorization')?.substring(7);
          const user = res.body;
          this.storageService.saveToken(token);
          this.storageService.saveUser(user);
          return true;
        })
      );
  }
  register(signupRequest: any): Observable<any> {
    return this.http.post(this.AUTH_API + 'sign-up', signupRequest);
  }
}
