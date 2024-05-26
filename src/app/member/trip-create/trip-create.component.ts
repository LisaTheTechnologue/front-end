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
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/_shared/components/error-dialog/error-dialog.component';
import { DatePipe, Location } from '@angular/common';
import { PageNotFoundException } from 'src/app/_shared/exceptions/page-not-found.exception';
import { PublicService } from 'src/app/_shared/services/public.service';
import { MemberTripService } from 'src/app/_shared/services/member-trip.service';
import { ConfirmService } from 'src/app/_shared/services/confirm.service';
import { FormUtilsService } from 'src/app/_shared/services/form-utils.service';
import { Trip, TripDay } from 'src/app/_shared/models/trip.model';

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
  }
  ngOnInit(): void {

    this.tripForm = this.fb.group({
      // img: [null, [Validators.required]],
      cityId: [null, [Validators.required]],
      title: [null, [Validators.required, Validators.maxLength(50)]],
      summary: [null, [Validators.required, Validators.maxLength(50)]],
      price: [null, [Validators.required]],
      notes: [null, [Validators.required, Validators.maxLength(250)]],
      groupSize: [null, [Validators.required]],
      minAge: [null, [Validators.min(10),Validators.max(80)]],
      maxAge: [null, [Validators.min(10),Validators.max(80)]],
      // allAges: [null],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      tripStatus: [null, [Validators.required]],
      tripLevel: [null, [Validators.required]],
      tripDays: this.fb.array([], [Validators.required]),
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

  selectedImage(event: File){
    this.selectedFile = event;
  }

  addItem(): void {
    const tripDays = this.tripForm.get('tripDays') as UntypedFormArray;
    tripDays.push(this.createItem());
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
    const tripDays = this.tripForm.get('tripDays') as UntypedFormArray;
    tripDays.removeAt(index);
  }
  getItemFormArray() {
    return (<UntypedFormArray>this.tripForm.get('tripDays')).controls;
  }

  getTripErrorMessage(fieldName: string): string {
    return this.formUtils.getFieldErrorMessage(this.tripForm, fieldName);
  }

  getDayErrorMessage(fieldName: string, index: number) {
    return this.formUtils.getFieldFormArrayErrorMessage(
      this.tripForm,
      'tripDays',
      fieldName,
      index
    );
  }
  tripId: number;
  submit(): void {
    // if (this.tripForm.valid) {
    this.confirmationService
      .confirm('Are you sure you want to submit this?')
      .subscribe((confirmed) => {
        if (confirmed) {
          // console.log(this.tripForm.value as Trip);
          this.memberTripService.createTrip(this.tripForm.value as Trip).subscribe({
            next: (res) => {
              this.tripId  = res.id;
              const formData: FormData = new FormData();
              formData.append('file', this.selectedFile);
              this.memberTripService.uploadImage(this.tripId, formData).subscribe({
                next: (res) => {
                  this.onSuccess('Created Trip Successfully');
                },
                error: (error) => {
                  console.log(error);
                  this.error += error;
                }
              }
              )

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
