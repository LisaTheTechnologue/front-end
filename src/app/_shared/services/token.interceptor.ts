import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // let HttpClient = inject(HttpClient)
    const token = StorageService.getToken();
    if(token) {
      let decodedToken = jwtDecode(token);
      const isExpired =
        decodedToken && decodedToken.exp
          ? decodedToken.exp < Date.now() / 1000
          : false;

      if (isExpired) {
        console.log('token expired');
        StorageService.signOut();
        this.router.navigateByUrl('login');
      }
    }
    return next.handle(request);
  }
}

