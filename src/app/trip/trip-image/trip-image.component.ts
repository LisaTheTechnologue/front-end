import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFileService } from '../../_shared/services/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { TripImage } from '../_models/trip-image';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trip-image',
  templateUrl: './trip-image.component.html',
  styleUrls: ['./trip-image.component.css']
})
export class TripImageComponent {
  // upload successfully
  // to do: select one image to be thumbnails

  id = 0;
  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Select File';
  images?:any[]=[];

  constructor(private uploadService: UploadFileService,
    private route: ActivatedRoute,
    private router: Router
    ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['tripId'];
    this.uploadService.getFiles(this.id).subscribe((data)=>{
      this.images = data;
      console.log(this.images);
    });
  }
  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }

  upload(): void {
    if (this.currentFile) {
      this.uploadService.upload(this.id,this.currentFile).subscribe({
        next: (event: any) => {

          // this.message = event.body.message;
          this.uploadService.getFiles(this.id).subscribe((data) => {
            this.images = data;
            console.log(this.images);
          });

        },
        error: (err: any) => {
          console.log(err);
          // this.progress = 0;

          // if (err.error && err.error.message) {
          //   this.message = err.error.message;
          // } else {
          //   this.message = 'Could not upload the file!';
          // }
        },
        complete: () => {
          this.currentFile = undefined;
        }
      });
    }
  }
}
