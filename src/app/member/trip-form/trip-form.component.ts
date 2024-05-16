import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, UntypedFormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TripDay, Trip } from 'src/app/_shared/models/trip.model';
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
  imageChanged: boolean = false;
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
    private formUtils: FormUtilsService
  ) {
    this.minDate = new Date();
  }
  ngOnInit(): void {
    this.isAddMode = !this.tripId;

    this.tripForm = this.fb.group({
      // img: [null, [Validators.required]],
      cityId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      summary: [null, [Validators.required]],
      price: [null, [Validators.required]],
      notes: [null],
      groupSize: [null, [Validators.required]],
      minAge: [null],
      maxAge: [null],
      // allAges: [null],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      // tripStatus: [null, [Validators.required]],
      tripLevel: [null, [Validators.required]],
      tripDays: this.fb.array([], [Validators.required]),
    });

    this.getAllCities();
    if (!this.isAddMode) {
      this.getTripById();
    }
  }
  getTripById() {
    // this.trip = new Trip();
    const userId = StorageService.getUserId();
    this.memberTripService.getTripById(this.tripId).subscribe((res) => {
      // create lines array first
      for (let item = 0; item < res.tripDays.length; item++) {
        this.addItem(res);
        // const itemsFormArray = this.tripForm.controls['items'] as UntypedFormArray;
        // itemsFormArray.push(this.createItem(res));
      }

      this.tripForm.patchValue(res);
      this.existingImage = 'data:image/jpeg;base64,' + res.byteImg;
      console.log(res);
      // this.trip = res;
      // this.trip.imageURL = 'data:image/jpeg;base64,' + res.byteImg;
      // this.image = this.trip.imageURL;
    });
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

  selectedImage(event: File) {
    this.selectedFile = event;
    this.imageChanged = true;
  }

  addItem(
    item: TripDay = { id: '', dayNo: 0, title: '', description: '' }
  ): void {
    const tripDays = this.tripForm.get('tripDays') as UntypedFormArray;
    tripDays.push(this.createItem(item));
  }
  private createItem(
    item: TripDay = { id: '', dayNo: 0, title: '', description: '' }
  ) {
    return this.fb.group({
      id: [item.id],
      dayNo: [item.dayNo, [Validators.required]],
      title: [item.title, [Validators.required]],
      description: [item.description, [Validators.required]],
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
  submit(): void {
    // if (this.tripForm.valid) {
    this.confirmationService
      .confirm('Are you sure you want to submit this?')
      .subscribe((confirmed) => {
        if (confirmed) {
          console.log(this.tripForm.value as Trip);
          this.memberTripService
            .updateTrip(this.tripId, this.tripForm.value as Trip)
            .subscribe({
              next: (res) => {
                if (this.imageChanged) {
                  this.tripId = res.id;
                  const formData: FormData = new FormData();
                  formData.append('file', this.selectedFile);
                  console.log(formData.get('file'));
                  this.memberTripService
                    .uploadImage(this.tripId, formData)
                    .subscribe({
                      next: (res) => {
                        this.onSuccess('Updated Trip Successfully');
                      },
                      error: (error) => {
                        console.log(error);
                        this.error += error;
                      },
                    });
                } else {
                  this.onSuccess('Updated Trip Successfully');
                }
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
    this.router.navigateByUrl('/member');
  }
  private onFailed(message: string) {
    this.snackBar.open(message, 'ERROR', {
      duration: 100000,
      panelClass: 'error-snackbar',
    });
  }
}
