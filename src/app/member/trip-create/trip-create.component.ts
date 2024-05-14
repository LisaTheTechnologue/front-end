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
import { DatePipe, Location } from '@angular/common';
import { PageNotFoundException } from 'src/app/_shared/exceptions/page-not-found.exception';
import { PublicService } from 'src/app/_shared/services/public.service';
import { MemberTripService } from 'src/app/_shared/services/member-trip.service';
import { ConfirmService } from 'src/app/_shared/services/confirm.service';
import { FormUtilsService } from 'src/app/_shared/services/form-utils.service';
import { TripDay } from 'src/app/_shared/models/trip.model';

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
  // startDateModel: NgbDateStruct;
  minDate: Date;
  startDate: Date;
  endDate: Date;
  // endDateModel: NgbDateStruct;
  // today = new Date();
  // age: string;
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
    private datePipe: DatePipe,
    private formUtils: FormUtilsService
  ) {
    this.minDate = new Date();
    // const current = new Date();
    // config.minDate = {
    //   year: current.getFullYear(),
    //   month: current.getMonth() + 1,
    //   day: current.getDate(),
    // };
    //config.maxDate = { year: 2099, month: 12, day: 31 };
    // config.outsideDays = 'hidden';
  }
  ngOnInit(): void {
    this.tripForm = this.fb.group({
      img: [null, [Validators.required]],
      cityId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      summary: [null, [Validators.required]],
      price: [null, [Validators.required]],
      highlights: [null, [Validators.required]],
      notes: [null, [Validators.required]],
      groupSize: [null, [Validators.required]],
      minAge: [null],
      maxAge: [null],
      // allAges: [null],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      tripStatus: [null, [Validators.required]],
      tripLevel: [null, [Validators.required]],
      items: this.fb.array([], [Validators.required]),
    });

    this.getAllCities();
  }
  // get items() {
  //   return this.tripForm.controls['items'] as FormArray;
  // }
  // getToday(): string {
  //   return new Date().toISOString().split('T')[0];
  // }
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
  addItem(): void {
    const items = this.tripForm.get('items') as UntypedFormArray;
    items.push(this.createItem());
  }
  private createItem(lesson: TripDay = { id: '', dayNo: 0, title: '', description:'' }) {
    return this.fb.group({
      id: [null],
      dayNo: [
        null,
        [Validators.required]
      ],
      title: [
        null,
        [Validators.required]
      ],
      description: [
        null,
        [Validators.required]
      ]
    });
  }
  removeItem(index: number) {
    const items = this.tripForm.get('items') as UntypedFormArray;
    items.removeAt(index);
  }
  getItemFormArray() {
    return (<UntypedFormArray>this.tripForm.get('items')).controls;
  }
  ageRange = { first: "20", last: "60" };

  onRangeChange(event: any) {
    this.ageRange = { first: event.value, last: event.value };
  }

  getTripErrorMessage(fieldName: string): string {
    return this.formUtils.getFieldErrorMessage(this.tripForm, fieldName);
  }

  getDayErrorMessage(fieldName: string, index: number) {
    return this.formUtils.getFieldFormArrayErrorMessage(
      this.tripForm,
      'items',
      fieldName,
      index
    );
  }

  submit(): void {
    // if (this.tripForm.valid) {
    this.confirmationService
      .confirm('Are you sure you want to submit this?')
      .subscribe((confirmed) => {
        if (confirmed) {
          // if (this.tripForm.valid) {
          this.startDate = this.tripForm.get('startDate').value;
          this.endDate = this.tripForm.get('endDate').value;
          const formattedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
          const formattedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
          const formData: FormData = new FormData();
          const userId = StorageService.getUserId();
          formData.append('img', this.tripForm.get('img').value);// this.selectedFile);
          formData.append('cityId', this.tripForm.get('cityId').value);
          formData.append('title', this.tripForm.get('title').value);
          formData.append('summary', this.tripForm.get('summary').value);
          formData.append('highlights', this.tripForm.get('highlights').value);
          formData.append('price', this.tripForm.get('price').value);
          formData.append('groupSize', this.tripForm.get('groupSize').value);
          formData.append('notes', this.tripForm.get('notes').value);
          formData.append('startDate', formattedStartDate);// this.tripForm.get('startDate').value);// this.startDate.toISOString());
          formData.append('endDate', formattedEndDate); //this.tripForm.get('endDate').value);// this.endDate.toISOString());
          formData.append('tripStatus', this.tripForm.get('tripStatus').value);
          formData.append('userId', userId);
          formData.append('minAge', this.tripForm.get('minAge').value);
          formData.append('maxAge', this.tripForm.get('maxAge').value);
          formData.append('tripLevel', this.tripForm.get('tripLevel').value);
          formData.append('tripDays', this.tripForm.get('items').value);

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
    // } else {
    //   this.formUtils.validateAllFormFields(this.tripForm);
    // }
  }
  private onSuccess(message: string) {
    this.snackBar.open(message, 'OK', { duration: 5000 });
  }
  private onFailed(message: string) {
    this.snackBar.open(message, 'ERROR', {
      duration: 100000,
      panelClass: 'error-snackbar',
    });
  }
}
