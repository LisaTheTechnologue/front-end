import { Injectable } from '@angular/core';
import { AppSettings } from '../app-settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  private AUTH_API = AppSettings.APP_ENDPOINT + 'auth/';
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // Create headers with exposed and allowed headers
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers':
        'Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-Custom-header',
      'Access-Control-Expose-Headers': 'Authorization',
    });
    return this.http
      .post(this.AUTH_API + 'login', body, { headers, observe: 'response' })
      .pipe(
        map((res) => {
          const token = res.headers.get('Authorization')?.substring(7);
          const user = res.body;
          this.storageService.saveToken(token);
          this.storageService.saveUser(user);
          this.loggedIn.asObservable();
          return true;
        }),
        catchError(this.errorHandler)
      );
  }
  register(signupRequest: any): Observable<any> {
    return this.http.post(this.AUTH_API + 'register', signupRequest);
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(error));
  }
}
