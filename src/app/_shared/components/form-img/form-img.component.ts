import { Component, EventEmitter, Output } from '@angular/core';
import { MemberTripService } from '../../services/member-trip.service';

@Component({
  selector: 'app-form-img',
  templateUrl: './form-img.component.html',
  styleUrls: ['./form-img.component.css']
})
export class FormImgComponent {
  fileName = '';
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  @Output() img= new EventEmitter<any>();
  constructor(private memberTripService: MemberTripService) {}
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile.name;
    this.img.emit(this.selectedFile);
    this.previewImage();
  }
  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
