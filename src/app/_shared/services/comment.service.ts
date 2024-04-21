import { Injectable } from '@angular/core';
import { AppSettings } from '../app-settings';
import { HttpClient } from '@angular/common/http';
import { NewComment } from './new-comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private COMMENTS_API = AppSettings.API_ENDPOINT + "comments";

  constructor(private http: HttpClient) {}

  create(comment: NewComment): Observable<any>{
    const targetUrl = `${this.COMMENTS_API}`;

    return this.http.post<Comment>(targetUrl, comment);
  }

  delete(commentId: number): Observable<any> {
    const targetUrl = `${this.COMMENTS_API}/${commentId}`;

    return this.http.delete<number>(targetUrl);
  }

  get(commentId: number): Observable<any> {
    const targetUrl = `${this.COMMENTS_API}/${commentId}`;

    return this.http.get<Comment>(targetUrl);
  }
}
