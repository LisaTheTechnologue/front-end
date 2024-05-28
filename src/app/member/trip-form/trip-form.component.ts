import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, UntypedFormArray, FormArray, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TripDay, Trip, Activity } from 'src/app/_shared/models/trip.model';
import { ConfirmService } from 'src/app/_shared/services/confirm.service';
import { FormUtilsService } from 'src/app/_shared/services/form-utils.service';
import { MemberTripService } from 'src/app/_shared/services/member-trip.service';
import { PublicService } from 'src/app/_shared/services/public.service';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})
export class TripFormComponent {
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  tripForm!: FormGroup;
  listOfCities: any = [];
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  existingImage: string | null = null;
  minDate: Date;
  startDate: Date;
  endDate: Date;
  isAddMode: boolean;
  error: any;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private memberTripService: MemberTripService,
    private location: Location,
    private confirmationService: ConfirmService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private publicService: PublicService,
    private router: Router,
    public formUtils: FormUtilsService
  ) {
    // this.minDate = new Date();
  }
  ngOnInit(): void {
    this.isAddMode = !this.tripId;

    this.initForm();

    this.getAllCities();
    if (!this.isAddMode) {
      this.getTripById();
    }
  }

  initForm() {
    this.tripForm = this.fb.group({

      title: new FormControl(''),
      summary: new FormControl(''),
      notes: new FormControl(''),
      startDate: new FormControl(''),
      endDate:new FormControl(''),
      groupSize: new FormControl(''),
      price: new FormControl(''),
      minAge: new FormControl(''),
      maxAge: new FormControl(''),
      tripLevel: new FormControl(''),
      cityId: new FormControl(''),
      // imageURL: this.fb.array([]),
      // youtubeURL: this.fb.array([]),
      // tripDays: this.fb.array([])
      tripDays: this.fb.array([])
    });
  }

  tripDays(): FormArray {
    return this.tripForm.get('tripDays') as FormArray;
  }
 
  newTripDay(): FormGroup {
    return this.fb.group({
      dayNo: 1,
      activities: this.fb.array([])
    });
  }
 
  addTripDay() {
    this.tripDays().push(this.newTripDay());
  }
 
  removeTripDay(empIndex: number) {
    this.tripDays().removeAt(empIndex);
  }
 
  activities(empIndex: number): FormArray {
    return this.tripDays()
      .at(empIndex)
      .get('activities') as FormArray;
  }
 
  newActivity(): FormGroup {
    return this.fb.group({
      title: '',
      description: ''
    });
  }
 
  addActivity(empIndex: number) {
    this.activities(empIndex).push(this.newActivity());
  }
 
  removeActivity(empIndex: number, skillIndex: number) {
    this.activities(empIndex).removeAt(skillIndex);
  }




  getTripById() {
    // this.trip = new Trip();
    // const userId = StorageService.getUserId();
    this.memberTripService.getTripById(this.tripId).subscribe((res) => {
      // create lines array first
      // for (let item = 0; item < res.tripDays.length; item++) {
      //   this.addItem(res);
      // }

      this.tripForm.patchValue(res);
      this.existingImage = 'data:image/jpeg;base64,' + res.byteImg;
      // console.log(res);
    });
  }
  getAllCities() {
    this.publicService.getAllCities().subscribe({
      next: (res) => {
        this.listOfCities = res;
      },
      // error: (error) => {
      //   this.onFailed(error);
      // },
    });
  }

  selectedImage(event: File) {
    this.selectedFile = event;
    // this.imageChanged = true;
  }


  getTripErrorMessage(fieldName: string): string {
    return this.formUtils.getFieldErrorMessage(this.tripForm, fieldName);
  }

  public getDayErrorMessage(fieldName: string, index: number) {
    return this.formUtils.getFieldFormArrayErrorMessage(
      this.tripForm,
      'tripDays',
      fieldName,
      index
    );
  }

  submit(): void {
    // if (this.isAddMode) {
      this.create();
    // } else {
      // this.update();
    // }
  }

  create() {
    // if (this.selectedFile != null) {
    console.log(this.tripForm.value);
    // this.confirmationService
    //   .confirm('Are you sure you want to submit this?')
    //   .subscribe((confirmed) => {
    //     if (confirmed) {
    this.memberTripService
      .createTrip(this.tripForm.value as Trip)
      .subscribe({
        next: (res) => {
          // if (this.selectedFile != null) {
          // this.tripId = res.id;
          // const formData: FormData = new FormData();
          // formData.append('file', this.selectedFile);
          // this.memberTripService
          //   .uploadImage(this.tripId, formData)
          //   .subscribe({
          //     next: (res) => {
          //       this.onSuccess('Created Trip Successfully');
          //     },
          // error: (error) => {
          //   console.log(error);
          //   this.error += error;
          // },
          // });
          // } else {
          // this.onSuccess('Created Trip Successfully');
          // }
        },
        error: (error) => {
          this.onFailed(error);
        },
      });
    // } else {
    // Handle cancellation
    // }
    // });
    // } else {
    //   // this.formUtils.validateAllFormFields(this.tripForm);
    //   this.onFailed("Image is required");
    // }
  }

  // update() {
  //   this.confirmationService
  //     .confirm('Are you sure you want to submit this?')
  //     .subscribe((confirmed) => {
  //       if (confirmed) {
  //         this.memberTripService
  //           .updateTrip(this.tripId, this.tripForm.value as Trip)
  //           .subscribe({
  //             next: (res) => {
  //               if (this.selectedFile != null) {
  //                 this.tripId = res.id;
  //                 const formData: FormData = new FormData();
  //                 formData.append('file', this.selectedFile);
  //                 // console.log(formData.get('file'));
  //                 this.memberTripService
  //                   .uploadImage(this.tripId, formData)
  //                   .subscribe({
  //                     next: (res) => {
  //                       this.onSuccess('Updated Trip Successfully');
  //                     },
  //                     // error: (error) => {
  //                     //   console.log(error);
  //                     //   this.error += error;
  //                     // },
  //                   });
  //               } else {
  //                 this.onSuccess('Updated Trip Successfully');
  //               }
  //             },
  //             // error: (error) => {
  //             //   this.onFailed(error.error.body.detail);
  //             // },
  //           });
  //       } else {
  //         // Handle cancellation
  //       }
  //     });
  // }
  private onSuccess(message: string) {
    this.snackBar.open(message, 'OK', { duration: 5000 });
    // this.router.navigateByUrl('/member');
  }
  private onFailed(message: string) {
    this.snackBar.open(message, 'ERROR', {
      duration: 100000,
      panelClass: 'error-snackbar',
    });
  }
}
