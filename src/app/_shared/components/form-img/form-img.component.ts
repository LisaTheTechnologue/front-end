import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input() isAddMode:boolean;
  @Input() existingImage:string;
  @Output() img= new EventEmitter<any>();
  @Output() imageChanged= new EventEmitter<boolean>();

  constructor(private memberTripService: MemberTripService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile.name;
    this.img.emit(this.selectedFile);
    if(this.existingImage!=null){
      this.imageChanged.emit(true);
    }
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
