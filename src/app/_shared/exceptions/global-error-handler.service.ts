import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(public router: Router) {}
  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      switch (error.status) {
        case 401: //login
          this.router.navigateByUrl('/login');
          break;
        case 403: //forbidden
          this.router.navigateByUrl('/page-not-found');
          break;
        default:
          console.error(
            `Backend returned code ${error.status}, body was: `,
            error.error
          );
          break;
      }
    }
  }
}
