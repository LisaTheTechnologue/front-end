import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AppSettings } from 'src/app/_shared/app-settings';
import { StorageService } from 'src/app/_shared/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private PAYMENT_API = AppSettings.MEMBER_API_ENDPOINT + 'payment/';
  constructor(private http: HttpClient) {}

  getSellerInfo(userId: number): Observable<any> {
    return this.http.get(this.PAYMENT_API + 'info/' + userId, {
      headers: this.createAuthorizationHeader(),
    });
  }
  getListPayment(userId: number): Observable<any> {
    return this.http.get(this.PAYMENT_API + 'info/' + userId, {
      headers: this.createAuthorizationHeader(),
    });
  }
  getPaymentById(paymentId: number): Observable<any> {
    return this.http.get(this.PAYMENT_API + '/paymentId' + paymentId, {
      headers: this.createAuthorizationHeader(),
    });
  }

  confirm(paymentDto: any): Observable<any> {
    return this.http.post(this.PAYMENT_API + 'confirm', paymentDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  fail(paymentDto: any): Observable<any> {
    return this.http.post(this.PAYMENT_API + 'fail', paymentDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  createPayment(paymentDto: any): Observable<any> {
    return this.http.post(this.PAYMENT_API + 'trip', paymentDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }
}
