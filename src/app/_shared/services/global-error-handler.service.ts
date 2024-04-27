import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler{

  constructor(public router: Router) {
  }

  handleError(error) {
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('Error Event');
      } else {
        switch (error.status) {
          case 401: //login
            this.router.navigateByUrl('/login');
            break;
          case 403: //forbidden
            this.router.navigateByUrl('/page-not-found');
            break;
        }
      }
    } else {
      console.error('some thing else happened');
    }
  }
}
