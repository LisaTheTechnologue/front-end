import { Injectable } from '@angular/core';

const TOKEN = 'ttos-token';
const USER = 'ttos-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN);
    localStorage.setItem(TOKEN, token);
  }

  public saveUser(user): void {
    localStorage.removeItem(USER);
    localStorage.setItem(USER, JSON.stringify(user));
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem(TOKEN);
    return (authToken !== null) ? true : false;
  }
  static getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId(): string {
    const user = this.getUser();
    if (user==null) {
      return '';
    }
    return user.userId;
  }

  static getUserRole(): string {
    const user = this.getUser();
    if (user==null) {
      return '';
    }
    return user.role;
  }

  static isAdminLoggedIn(): boolean {
    if(this.getToken == null){
      return false;
    }
    const role: string =  this.getUserRole();
    return role == 'ROLE_ADMIN';
  }

  static isMemberLoggedIn(): boolean {

    if(this.getToken == null){
      return false;
    }
    const role: string =  this.getUserRole();
    return role == 'ROLE_MEMBER';
  }

  static signOut(): void {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
  }
}
