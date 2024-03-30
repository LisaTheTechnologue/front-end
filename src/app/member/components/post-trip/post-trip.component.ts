import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  UntypedFormArray,
  FormArray,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MemberService } from '../../services/member.service';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-trip',
  templateUrl: './post-trip.component.html',
  styleUrls: ['./post-trip.component.css'],
})
export class PostTripComponent {
  tripForm!: FormGroup;
  listOfCities: any = [];
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  fromDateModel: NgbDateStruct;
  toDateModel: NgbDateStruct;
  today= new Date();
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private memberService: MemberService,
    private router: Router,
    private config: NgbDatepickerConfig) {
      const current = new Date();
      config.minDate = { year: current.getFullYear(), month:
      current.getMonth() + 1, day: current.getDate() };
        //config.maxDate = { year: 2099, month: 12, day: 31 };
      config.outsideDays = 'hidden';
    }
  ngOnInit(): void {
    this.tripForm = this.fb.group({
      cityId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      budget: [null, [Validators.required]],
      highlights: [null, [Validators.required]],
      noOfParticipants: [null, [Validators.required]],
      ageFrom: [null],
      ageTo: [null],
      ageAll: [null],
      fromDateModel: [null, [Validators.required]],
      toDateModel: [null, [Validators.required]],
      tripStatus: [null, [Validators.required]],
      tripLevel: [null, [Validators.required]],
      items: this.fb.array([]),
    });

    this.getAllCities();
  }
  get items() {
    return this.tripForm.controls['items'] as FormArray;
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }
  getAllCities() {
    this.memberService.getAllCities().subscribe((res) => {
      this.listOfCities = res;
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }
  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  addItems() {
    const itemForm = this.fb.group({
      // _id: [lesson._id],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.items.push(itemForm);
  }

  getItemFormArray() {
    return (<UntypedFormArray>this.tripForm.get('items')).controls;
  }
  removeItem(index: number) {
    this.items.removeAt(index);
  }
  addTrip(): void {
    if (this.tripForm.valid) {
      const formData: FormData = new FormData();
      const userId = StorageService.getUserId();
      formData.append('img', this.selectedFile);
      formData.append('cityId', this.tripForm.get('cityId').value);
      formData.append('title', this.tripForm.get('title').value);
      formData.append('highlights', this.tripForm.get('highlights').value);
      formData.append('budget', this.tripForm.get('budget').value);
      formData.append(
        'noOfParticipants',
        this.tripForm.get('noOfParticipants').value
      );
      formData.append('fromDate', this.tripForm.get('fromDate').value);
      formData.append('toDate', this.tripForm.get('toDate').value);
      formData.append(
        'tripStatusString',
        this.tripForm.get('tripStatus').value
      );
      formData.append('userId', userId);
      formData.append(
        'itemsJsonString',
        JSON.stringify(this.tripForm.get('items').value)
      );
      this.memberService.addTrip(formData).subscribe((res) => {
        if (res.id != null) {
          this.snackBar.open('Product Posted Successful!', 'Close', {
            duration: 5000,
          });
          this.router.navigateByUrl('/member/my-trips');
        } else {
          this.snackBar.open(res.message, 'ERROR', {
            duration: 5000,
            panelClass: 'error-snackbar',
          });
        }
      });
    } else {
      for (const i in this.tripForm.controls) {
        this.tripForm.controls[i].markAsDirty();
        this.tripForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
