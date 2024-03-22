import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../_shared/app-settings';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  private IMAGE_API_ENDPOINT = AppSettings.TRIPS_API_ENDPOINT;

  constructor(private http: HttpClient) {}

  upload(id: number, image: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('image', image);

    const req = new HttpRequest(
      'POST',
      `${this.IMAGE_API_ENDPOINT}` + id + `/images`,
      formData,
      {
        reportProgress: true,
        responseType: 'text',
      }
    );

    return this.http.request(req);
  }

  getFiles(id: number):Observable<any> {
    return this.http.get(
      `${this.IMAGE_API_ENDPOINT}` + id + `/images`
    );
  }

  getFile(id: number):Observable<any> {
    return this.http.get<any[]>(
      `${this.IMAGE_API_ENDPOINT}` + id + `/images`
    );
  }
}
