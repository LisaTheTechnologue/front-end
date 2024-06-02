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
import { SharedDataService } from 'src/app/_shared/services/shared-data.service';
import { UploadedImage } from 'src/app/_shared/models/image.model';
import { UploadImageService } from 'src/app/_shared/services/upload-image.service';
@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})
export class TripFormComponent {
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  tripForm!: FormGroup;
  listOfCities: any = [];
  
  limitFileSize: number;
  MAX_FILE_SIZE = 1024;
  // thumbnails
  selectedImage: File | null;
  existingImage: string | null = null;
  imagePreview: string | ArrayBuffer | null;

  selectedImagesFileList!: FileList;
  selectedImagesFileArray: File[] = [];  

  existedImagesFileList: FileList;
  existedImagesFileArray: File[] = [];
  existedImagesAnyArray: any[] = [];

  minDate: Date;
  startDate: Date;
  endDate: Date;
  isAddMode: boolean;
  error: any;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private memberTripService: MemberTripService,
    private uploadImageService: UploadImageService,
    private location: Location,
    private confirmationService: ConfirmService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private publicService: PublicService,
    private router: Router,
    private sharedData: SharedDataService,
    public formUtils: FormUtilsService
  ) {
    this.minDate = new Date();
  }
  ngOnInit(): void {
    this.isAddMode = !this.tripId;

    this.initForm();

    this.getAllCities();
    if (!this.isAddMode) {
      this.getTripById();
    } else if (this.sharedData.getData() != null) {
      this.populateForm(this.sharedData.getData());
      this.sharedData.setData(null);
    }
  }

  initForm() {
    this.tripForm = this.fb.group({
      title: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
      summary: ['', [Validators.required, Validators.min(1), Validators.max(250)]],
      notes: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      groupSize: [0, [Validators.required, Validators.min(0), Validators.max(50)]],
      price: [0, [Validators.required, Validators.min(0), Validators.max(2147483647)]],
      minAge: [15, [Validators.min(15), Validators.max(70)]],
      maxAge: [70, [Validators.min(15), Validators.max(70)]],
      tripLevel: [null, [Validators.required]],
      cityId: [null, [Validators.required]],
      cancelOneMonth: [null, [Validators.required]],
      cancelOneWeek: [null, [Validators.required]],
      cancelOneDay: [null, [Validators.required]],
      img: [null, [Validators.required]],
      images: this.fb.array([]),
      tripDays: this.fb.array([])
    });
  }

  tripDays(): FormArray {
    return this.tripForm.get('tripDays') as FormArray;
  }

  newTripDay(): FormGroup {
    return this.fb.group({
      id: 0,
      dayNo: 1,
      activities: this.fb.array([])
    });
  }

  addTripDay() {
    // const tripDays = this.tripForm.get('tripDays') as UntypedFormArray;
    this.tripDays().push(this.newTripDay());
  }

  removeTripDay(dayIndex: number) {
    this.tripDays().removeAt(dayIndex);
  }

  activities(dayIndex: number): FormArray {
    return this.tripDays()
      .at(dayIndex)
      .get('activities') as FormArray;
  }

  newActivity(): FormGroup {
    return this.fb.group({
      id: 0,
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  addActivity(dayIndex: number) {
    this.activities(dayIndex).push(this.newActivity());
  }

  removeActivity(dayIndex: number, activityIndex: number) {
    this.activities(dayIndex).removeAt(activityIndex);
  }

  getTripById() {
    // this.trip = new Trip();
    // const userId = StorageService.getUserId();
    this.memberTripService.getTripById(this.tripId).subscribe((res) => {
      // create lines array first
      this.populateForm(res);
      // console.log(res);
    });
  }

  private populateForm(res: any) {
    res.tripDays.forEach(element => {
      var day: FormGroup = this.newTripDay();
      this.tripDays().push(day);

      element.activities.forEach(a => {
        var activity = this.newActivity();

        (day.get("activities") as FormArray).push(activity);
      });
    });
    this.tripForm.patchValue(res);
    this.existingImage = 'data:image/jpeg;base64,' + res.byteImg;
    this.existedImagesAnyArray = res.images.map(img => ({
      id: img.id,
      src: 'data:image/jpeg;base64,' + img.imageByte,  // Assuming your images are JPEGs and base64 encoded
      name: img.imageName
    }));
  }

  getAllCities() {
    this.publicService.getAllCities().subscribe({
      next: (res) => {
        this.listOfCities = res;
      },
    });
  }

  onSelectedImage(event: File) {
    this.selectedImage = event;
    this.existingImage = null;
    this.tripForm.patchValue({ img: this.selectedImage });
  }
  
  urls = new Array<string>();
  onSelectedImages(event) {
    this.urls = [];
    // let files = event.target.files;
    this.selectedImagesFileList = event.target.files;
    // if (files.length > 0) {
      if (this.selectedImagesFileList.length > 0) {
      for (let i = 0; i < this.selectedImagesFileList.length; i++) {
        const file = this.selectedImagesFileList[i];
        const fileSize = file.size;
        if (fileSize > (this.limitFileSize * this.MAX_FILE_SIZE)) { // 1 MB in bytes
          this.onFailed('File size exceeds the maximum limit of ' + this.limitFileSize + ' KB.');
          this.selectedImagesFileList = null;
          break;
        }
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
        this.selectedImagesFileArray.push(file);
      }
    }
  }
  existedImagesIds = new Array<string>();
  removeImage(index: number) {
    this.existedImagesAnyArray.splice(index, 1);
    this.existedImagesAnyArray.at(index)
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
    if (this.isAddMode) {
      this.create();
    } else {
      this.update();
    }
  }

  create() {
    if (this.selectedImage != null && this.selectedImagesFileArray.length > 0) {
      const formData: FormData = this.convertToFormData();

      this.confirmationService
        .confirm('Are you sure you want to submit this?')
        .subscribe((confirmed) => {
          if (confirmed) {
            this.memberTripService
              .createTrip(formData)
              .subscribe({
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
    } else {
      // this.formUtils.validateAllFormFields(this.tripForm);
      this.onFailed("Image is required");
    }
  }

  private convertToFormData() {
    const formData: FormData = new FormData();
    formData.append('title', this.tripForm.get('title').value);
    formData.append('cityId', this.tripForm.get('cityId').value);
    formData.append('tripLevel', this.tripForm.get('tripLevel').value);
    formData.append('summary', this.tripForm.get('summary').value);
    formData.append('price', this.tripForm.get('price').value);
    formData.append('groupSize', this.tripForm.get('groupSize').value);
    formData.append('minAge', this.tripForm.get('minAge').value); 
    formData.append('maxAge', this.tripForm.get('maxAge').value);
    var startDateStr = (new Date(this.tripForm.get('startDate').value)).toISOString();
    formData.append('startDate', startDateStr);
    var endDateStr = (new Date(this.tripForm.get('endDate').value)).toISOString();
    formData.append('endDate', endDateStr);
    formData.append('notes', this.tripForm.get('notes').value);
    formData.append('cancelOneMonth', this.tripForm.get('cancelOneMonth').value);
    formData.append('cancelOneWeek', this.tripForm.get('cancelOneWeek').value);
    formData.append('cancelOneDay', this.tripForm.get('cancelOneDay').value);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    } else {
      // Handle the case where no file was selected (optional)
      console.log('No file selected');
    }
    
    // Loop through each item in the FormArray
    const tripDays = this.tripForm.get('tripDays').value;
    formData.append('tripDaysJson', JSON.stringify(tripDays));

    for (let i = 0; i < this.selectedImagesFileList.length; i++) {
      formData.append('images', this.selectedImagesFileList.item(i));
    }
    this.existedImagesAnyArray.forEach(image => {
      formData.append('existedImages', image.id); 
    });   
    formData.forEach((value, key) => {
      console.log(`Key: ${key}, Value: ${value}`);
    });
    return formData;
  }

  update() {
    if ((this.selectedImage != null || this.existingImage != null) && 
      (this.existedImagesAnyArray.length > 0 || this.selectedImagesFileList.length >0)) {
      const formData: FormData = this.convertToFormData();

      this.confirmationService
        .confirm('Are you sure you want to submit this?')
        .subscribe((confirmed) => {
          if (confirmed) {
            this.memberTripService
              .updateTrip(this.tripId,formData)
              .subscribe({
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
    } else {
      // this.formUtils.validateAllFormFields(this.tripForm);
      this.onFailed("Image is required");
    }
  }
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
