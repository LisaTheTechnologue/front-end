import { Injectable } from '@angular/core';
import { AppSettings } from '../app-settings';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { StorageService } from './storage.service';
import { PageNotFoundException } from '../exceptions/page-not-found.exception';

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
      );
  }
  register(signupRequest: any): Observable<any> {
    return this.http.post(this.AUTH_API + 'register', signupRequest)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      // Redirect to page not found component
      return throwError(() => new PageNotFoundException());
    }
    let errorMessage = '';
    // Handle other errors here
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred. Handle it accordingly.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error: ${error.error}`;
      
    }
    return throwError(errorMessage);
  }
  
}
