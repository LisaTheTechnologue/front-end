import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { PageNotFoundException } from './page-not-found.exception';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(public router: Router, 
    private zone: NgZone, 
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }
  handleError(error: any) {
    if (error.status == undefined) {
      this.snackBar.open(error?.message, 'X', {
        duration: 10000,
        panelClass: 'error-snackbar',
      });
      // this.dialog.open(ErrorDialogComponent, {
      //   data: error?.message
      // });
    } else {
      let errorMessage = '';
      switch (error.status) {
        case 401: //login
          // errorMessage = 'Please login';
          this.router.navigateByUrl('/login');
          break;
        case 404: //forbidden
          // errorMessage = 'Page not found';
          this.router.navigate(['/page-not-found']);
          break;
        default:
          if (error.error && error.error.body && error.error.body.detail) {
            errorMessage = error.error.body.detail;
          } else if (error.message) {
            errorMessage = error.message;
          } else {
            errorMessage = 'Lỗi. Xin liên hệ admin.';
          }
          this.zone.run(() => {
            this.snackBar.open(errorMessage, 'X', {
              duration: 10000,
              panelClass: 'error-snackbar',
            });
            // this.dialog.open(ErrorDialogComponent, { data: errorMessage });
          });
          break;
      }
      
    }
  }
  // private onFailed(message: string) {
  //   this.snackBar.open(message, 'X', {
  //     duration: 10000,
  //     panelClass: 'error-snackbar',
  //   });
  // }
  // handleError(error: HttpErrorResponse) {
  //   if (error.status === 404) {
  //     // Redirect to page not found component
  //     return throwError(() => new PageNotFoundException());
  //   }
  //   if (error.status === 401) {
  //     // Redirect to page not found component
  //     this.router.navigateByUrl('/login');
  //   }
  //   // Handle other errors here
  //   if (error.error) {
  //     // Extract error details from the response body
  //     const errorMessage = error.error.message || error.error;
  //     const errorCode = error.error.body.status; // Assuming your error object has these properties
  //     const errorDetail = error.error.body.detail;
  //     // Display the error message to the user (e.g., using a toast notification)
  //     console.error('Error:', errorMessage, 'Code:', errorCode, 'Details:', errorDetail); // Log for debugging
  //     // You can display the error message in a user-friendly way
  //     return throwError(errorDetail);
  //   } else {
  //     // Handle network or other non-2xx error situations
  //     console.error('An unexpected error occurred!');
  //   }
  //   return throwError(error);
  // }
}
