import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app-settings';
import { PublicProfile, User } from '../models/user.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private PROFILE_API = AppSettings.API_ENDPOINT + "profile";
  constructor(public http: HttpClient) {}

  /*
    endpoints:
        api/profiles/
      ✔ [GET]         /profiles/{email}
          + if email is null, check for currently logged in user
      ✔ [GET]         /profiles/selection/{emails}
          + used to get a collection of profiles by their emails
      ✔ [POST]        /profiles/
          + used for creating users
          + takes in a `ProfileApiModel` as the request body
      ✔ [PUT][AUTH]   /profiles/
          + only works for currently logged in user
          + used for updating the current user
      - [POST]        /profiles/upload
          + uploads an image via a form (input type='file')
  */
  public getProfile(userid: any): Observable<User> /* profile */ {
    return this.http.get<User>(this.PROFILE_API + "?userId=" + userid);
  }

  public getProfileWithNullRoute(): Observable<User> /* null route */ {
    return this.http.get<User>(this.PROFILE_API);
  }

  public getPublicProfile(leaderId: any): Observable<PublicProfile> /* profile */ {
    return this.http.get<PublicProfile>(this.PROFILE_API + "?leaderId=" + leaderId);
  }


  public getProfilesByEmails(emails: string[]): Observable<User> /* profile */ {
    // make empty collection of profiles
    // emails={abc, 123, }
    return this.http.get<User>(this.PROFILE_API + 'selection/' + emails);
  }

  public createProfile(profile: User): Observable<User> {
    return this.http.post<User>(`${this.PROFILE_API}`, profile);
  }

  public updateProfile(email: string, profile: User): Observable<User> {


    return this.http.put<User>(this.PROFILE_API + email, profile,
      { headers: this.createAuthorizationHeader(), });
  }

  public getProfileByName(name: string): Observable<User[]>{

    return this.http.get<User[]>(`${this.PROFILE_API}` + 'search', {params: new HttpParams({fromObject: {
      'name': name
    }} as HttpParamsOptions),
    headers: this.createAuthorizationHeader(),
  });
  }

  private createAuthorizationHeader(): HttpHeaders{
    console.log(StorageService.getToken());
    return new HttpHeaders().set(
      'Authorization','Bearer ' + StorageService.getToken()
    )
  }
}
