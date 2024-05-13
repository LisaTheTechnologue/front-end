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
import { StorageService } from 'src/app/_shared/services/storage.service';
import { NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/_shared/components/error-dialog/error-dialog.component';
import { Location } from '@angular/common';
import { PageNotFoundException } from 'src/app/_shared/exceptions/page-not-found.exception';
import { PublicService } from 'src/app/_shared/services/public.service';
import { MemberTripService } from 'src/app/_shared/services/member-trip.service';
import { ConfirmService } from 'src/app/_shared/services/confirm.service';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.css']
})
export class TripCreateComponent {
  tripForm!: FormGroup;
  listOfCities: any = [];
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  startDateModel: NgbDateStruct;
  startDate: Date;
  endDate: Date;
  endDateModel: NgbDateStruct;
  today = new Date();
  age: string;
  error: any;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private memberTripService: MemberTripService,
    private location: Location,
    private confirmationService: ConfirmService,
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
      summary: [null, [Validators.required]],
      price: [null, [Validators.required]],
      highlights: [null, [Validators.required]],
      notes: [null, [Validators.required]],
      groupSize: [null, [Validators.required]],
      minAge: [null],
      maxAge: [null],
      allAges: [null],
      startDateModel: [null, [Validators.required]],
      endDateModel: [null, [Validators.required]],
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
        this.onFailed(error);
      },
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

  onSelectstartDate(evt: any) {
    this.startDate = new Date(evt.year, evt.month - 1, evt.day);
    console.log(this.startDate);
  }

  onSelectendDate(evt: any) {
    this.endDate = new Date(evt.year, evt.month - 1, evt.day);
    console.log(this.endDate);
  }

  submit(): void {
    this.confirmationService
      .confirm('Are you sure you want to submit this?')
      .subscribe((confirmed) => {
        if (confirmed) {
          // if (this.tripForm.valid) {
          const formData: FormData = new FormData();
          const userId = StorageService.getUserId();
          formData.append('img', this.selectedFile);
          formData.append('cityId', this.tripForm.get('cityId').value);
          formData.append('title', this.tripForm.get('title').value);
          formData.append('summary', this.tripForm.get('summary').value);
          formData.append('highlights', this.tripForm.get('highlights').value);
          formData.append('price', this.tripForm.get('price').value);
          formData.append('groupSize', this.tripForm.get('groupSize').value);
          formData.append('notes', this.tripForm.get('notes').value);
          formData.append('startDate', this.startDate.toISOString());
          formData.append('endDate', this.endDate.toISOString());
          formData.append('tripStatus', status);
          formData.append('userId', userId);
          formData.append('minAge', this.tripForm.get('minAge').value);
          formData.append('maxAge', this.tripForm.get('maxAge').value);
          formData.append('tripLevel', this.tripForm.get('tripLevel').value);
          formData.append(
            'itemsJsonString',
            JSON.stringify(this.tripForm.get('items').value)
          );
          this.memberTripService.createTrip(formData).subscribe({
            next: (res) => {
              this.onSuccess('Created Trip Successfully');
            },
            error: (error) => {
              this.onFailed(error);
            },
          });
        } else {
          // Handle cancellation
        }
      });
  }
  onCancel() {
    this.location.back();
  }
  private onSuccess(message: string) {
    this.snackBar.open(message, '', { duration: 5000 });
    this.onCancel();
  }
  private onFailed(message: string) {
    this.snackBar.open(message, 'ERROR', {
      duration: 100000,
      panelClass: 'error-snackbar',
    });
    this.onCancel();
  }
}
