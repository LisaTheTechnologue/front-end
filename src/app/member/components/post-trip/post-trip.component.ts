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
import { MemberService } from '../../../_shared/services/member.service';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/_shared/components/error-dialog/error-dialog.component';
import { Location } from '@angular/common';
import { PageNotFoundException } from 'src/app/_shared/exceptions/page-not-found.exception';
import { PublicService } from 'src/app/_shared/services/public.service';
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
  fromDate: Date;
  toDate: Date;
  toDateModel: NgbDateStruct;
  today = new Date();
  age: string;
  error: any;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private memberService: MemberService,
    private location: Location,
    private dialog: MatDialog,
    private router: Router,
    private publicService: PublicService,
    private config: NgbDatepickerConfig
  ) {
    const current = new Date();
    config.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };
    //config.maxDate = { year: 2099, month: 12, day: 31 };
    config.outsideDays = 'hidden';
  }
  ngOnInit(): void {
    this.tripForm = this.fb.group({
      cityId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      introduction: [null, [Validators.required]],
      budget: [null, [Validators.required]],
      highlights: [null, [Validators.required]],
      notes: [null, [Validators.required]],
      groupSize: [null, [Validators.required]],
      fromAge: [null],
      toAge: [null],
      allAges: [null],
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
    this.publicService.getAllCities().subscribe({
      next: (res) => {
        this.listOfCities = res;
      },
      error: (error) => {
        if (error instanceof PageNotFoundException) {
          this.router.navigate(['/page-not-found']);
        } else {
          // Handle other errors here
          this.error = error.message;
        }
      }}
    );
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
      dayNo: [null, [Validators.required]],
      title: [null, [Validators.required]],
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

  onSelectFromDate(evt: any) {
    this.fromDate = new Date(evt.year, evt.month - 1, evt.day);
    console.log(this.fromDate);
  }

  onSelectToDate(evt: any) {
    this.toDate = new Date(evt.year, evt.month - 1, evt.day);
    console.log(this.toDate);
  }

  submit(status: string): void {
    // if (this.tripForm.valid) {
    const formData: FormData = new FormData();
    const userId = StorageService.getUserId();
    formData.append('img', this.selectedFile);
    formData.append('cityId', this.tripForm.get('cityId').value);
    formData.append('title', this.tripForm.get('title').value);
    formData.append('introduction', this.tripForm.get('introduction').value);
    formData.append('highlights', this.tripForm.get('highlights').value);
    formData.append('budget', this.tripForm.get('budget').value);
    formData.append('groupSize', this.tripForm.get('groupSize').value);
    formData.append('notes', this.tripForm.get('notes').value);
    formData.append('fromDate', this.fromDate.toISOString());
    formData.append('toDate', this.toDate.toISOString());
    formData.append('tripStatus', status);
    formData.append('userId', userId);
    formData.append('fromAge', this.tripForm.get('fromAge').value);
    formData.append('toAge', this.tripForm.get('toAge').value);
    formData.append('tripLevel', this.tripForm.get('tripLevel').value);
    formData.append(
      'itemsJsonString',
      JSON.stringify(this.tripForm.get('items').value)
    );
    this.memberService.addTrip(formData).subscribe({
      next: (res) => {
        this.onSuccess();
      },
      error: (error) => {
        if (error instanceof PageNotFoundException) {
          this.router.navigate(['/page-not-found']);
        } else {
          // Handle other errors here
          this.error = error.message;
        }
      }}
    );
  }
  onCancel() {
    this.location.back();
  }
  private onSuccess() {
    this.snackBar.open('Trip saved successfully!', '', { duration: 5000 });
    this.onCancel();
  }

  // showError(error: any) {
  //   this.dialog.open(ErrorDialogComponent, {
  //     data: error,
  //   });
  // }
}
