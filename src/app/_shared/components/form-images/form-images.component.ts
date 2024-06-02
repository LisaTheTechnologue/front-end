import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploadedImage } from '../../models/image.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-images',
  templateUrl: './form-images.component.html',
  styleUrls: ['./form-images.component.css']
})
export class FormImagesComponent {
  MAX_FILE_SIZE = 1024;
  // @Input() isAddMode:boolean;
  @Input() existingImages:File[];
  @Input() limitFileSize:number;
  @Output() imagesSelected = new EventEmitter<File[]>();
  selectedImages: File[] = [];
  constructor(private snackBar: MatSnackBar) {}
  onFileSelected(event: any) {
    let files = event.target.files;
    for (let i = 0; i < files.length; i++) {      
      const file = files[i];
      const fileSize = file.size; 
      if (fileSize > (this.limitFileSize * this.MAX_FILE_SIZE)) { // 1 MB in bytes
        this.onFailed('File size exceeds the maximum limit of ' + this.limitFileSize + ' KB.');
        files = null;
        break;
      }
      this.selectedImages.push(file);
    }
    this.imagesSelected.emit(this.selectedImages); // Emit updated images list
  }

  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
    this.imagesSelected.emit(this.selectedImages); // Emit updated images list
  }

  private onFailed(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 100000,
      panelClass: 'error-snackbar',
    });
  }
}
