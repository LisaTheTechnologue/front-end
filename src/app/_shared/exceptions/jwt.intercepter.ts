import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(events => {
                if (events instanceof HttpResponse) {
                    // Handle successful responses if needed
                }
            }),
            catchError(err => {
                if (err instanceof HttpResponse && err.status === 401) {
                    this.router.navigate(['/login']);
                    return throwError(err); // Optionally re-throw for further error handling
                } else {
                    // Handle other errors as needed
                    return throwError(err);
                }
            })
        );
    }
}
