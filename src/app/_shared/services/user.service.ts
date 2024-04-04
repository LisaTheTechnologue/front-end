import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppSettings } from '../app-settings';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersAPI = AppSettings.API_ENDPOINT + 'users/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersAPI);
  }

  get(id: any): Observable<User> {
    return this.http.get<User>(`${this.usersAPI}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.usersAPI, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.usersAPI}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.usersAPI}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.usersAPI);
  }

  findByTitle(title: any): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersAPI}?title=${title}`);
  }

  getPublicContent(): Observable<any> {
    return this.http.get(this.usersAPI + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(this.usersAPI + 'user', { responseType: 'text' });
  }

  // getModeratorBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'mod', { responseType: 'text' });
  // }

  getAdminBoard(): Observable<any> {
    return this.http.get(this.usersAPI + 'admin', { responseType: 'text' });
  }
}
