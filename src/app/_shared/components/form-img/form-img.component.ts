import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MemberTripService } from '../../services/member-trip.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-img',
  templateUrl: './form-img.component.html',
  styleUrls: ['./form-img.component.css']
})
export class FormImgComponent {
  fileName = '';
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  MAX_FILE_SIZE = 1024;
  // @Input() isAddMode:boolean;
  @Input() existingImage:any;
  @Input() limitFileSize:number;
  @Output() selectedImage= new EventEmitter<any>();
  // @Output() imageChanged= new EventEmitter<boolean>();

  constructor(private snackBar: MatSnackBar) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const fileSize = this.selectedFile.size; 
      if (fileSize > (this.limitFileSize * this.MAX_FILE_SIZE)) { // 1 MB in bytes
        this.onFailed('File size exceeds the maximum limit of ' + this.limitFileSize + ' KB.');
        this.selectedFile = null; // Clear selected file if size exceeds limit
      } else {
        this.fileName = this.selectedFile.name;
        this.previewImage();
      }
    }
    this.selectedImage.emit(this.selectedFile);
  }
  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
  private onFailed(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 100000,
      panelClass: 'error-snackbar',
    });
  }
}
