import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent {
  selectedFile: File;

  constructor(private http: HttpClient) {}

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadCSV() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<any>('http://localhost:8080/upload', formData)
      .subscribe(response => {
        console.log('Upload successful:', response);
      }, error => {
        console.error('Upload failed:', error);
      });
  }
}
