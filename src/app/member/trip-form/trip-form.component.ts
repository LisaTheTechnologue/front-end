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
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import * as moment from 'moment';

interface TripLevel {
  label: string,
  value: string;
}
@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})
export class TripFormComponent {
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  tripForm!: FormGroup;
  listOfCities: any = [];
  // tripLevels = TripLevel;
  limitFileSize: number;
  MAX_FILE_SIZE = 1024;
  // thumbnails
  selectedImage: File | null;
  existingImage: string | null = null;
  imagePreview: string | ArrayBuffer | null;
  // tripLevels = Object.values(TripLevel) as string[];
  selectedImagesFileList!: FileList;
  selectedImagesFileArray: File[] = [];

  existedImagesFileList: FileList;
  existedImagesFileArray: File[] = [];
  existedImagesAnyArray: any[] = [];

  minDate: Date = new Date();
  startDate: Date;
  endDate: Date;
  isAddMode: boolean;
  error: any;
  tripLevels: TripLevel[] = [
    { label: "Dễ", value: 'EASY' },
    { label: "Trung bình", value: 'MODERATE' },
    { label: "Chuyên gia", value: 'MASTER' },
  ];
  tripLevel: any;
  setSelectedTripLevel(tripLevel: TripLevel) {
    // Use the bank object here, access both name and shortName
    this.tripLevel = tripLevel.value;
  }

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
    const today = new Date();
    this.minDate.setDate(today.getDate() + 7);
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
      // validation may working but logic for edit and copy is complicated
      // startDate: [null, []],
      // endDate: [null, []],
      groupSize: [1, [Validators.required, Validators.min(1), Validators.max(50)]],
      price: [0, [Validators.min(0), Validators.max(2147483647)]],
      minAge: [15, [Validators.min(15), Validators.max(80)]],
      maxAge: [70, [Validators.min(15), Validators.max(80)]],
      tripLevel: [null, [Validators.required]],
      cityId: [null, [Validators.required]],
      cancelOneMonth: [null, []],
      cancelOneWeek: [null, []],
      cancelOneDay: [null, []],
      image: [null, [Validators.required]],
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
    this.publicService.getByTripId(this.tripId).subscribe((res) => {
      this.populateForm(res);
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
    const selectedTripLevel = this.tripLevels.find(tripLevel => tripLevel.value === res.tripLevel);
    if (selectedTripLevel) {
      this.tripForm.controls['tripLevel'].setValue(selectedTripLevel);
    }
    const [day1, month1, year1] = res.startDate.split('-');
    let startDate: Date = new Date(+year1, +month1 - 1, +day1);
    const [day, month, year] = res.endDate.split('-');
    let endDate: Date = new Date(+year, +month - 1, +day);
    this.tripForm.controls['startDate'].setValue(startDate);
    this.tripForm.controls['endDate'].setValue(endDate);
    this.existingImage = res.imageByte;
    this.tripForm.controls['image'].setValue(this.existingImage);
    // working for copyData and Edit
    if (res.imageBytes) {
      this.existedImagesAnyArray = res.imageBytes.map(img => ({
        id: img.id,
        src: 'data:image/jpeg;base64,' + img.imageByte,  // Assuming your images are JPEGs and base64 encoded 
        name: img.imageName
      }));
    } else {
      this.existedImagesAnyArray = res.images.map(img => ({
        id: img.id,
        src: 'data:image/jpeg;base64,' + img.imageByte,  // Assuming your images are JPEGs and base64 encoded 
        name: img.imageName
      }));
    }

  }

  getAllCities() {
    this.publicService.getAllCities().subscribe({
      next: (res) => {
        this.listOfCities = res;
      },
    });
  }

  onSelectedImage(event: File | null) {
    this.selectedImage = event;
    this.existingImage = null;
    this.tripForm.get('image')?.setValue(this.selectedImage);
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
          this.onFailed('Ảnh vượt quá kích thước ' + this.limitFileSize + ' KB.');
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
  getActivityErrorMessage(fieldName: string, index: number) {
    return this.formUtils.getFieldFormArrayErrorMessage(
      this.tripForm,
      'activities',
      fieldName,
      index
    );
  }
  submit(): void {
    if (this.selectedImage == null && this.existingImage == null) {
      this.onFailed("Xin hãy chọn ảnh bìa");
      return;
    }
    // if (this.existedImagesFileArray.length == 0 && this.selectedImagesFileArray.length == 0) {
    //   this.onFailed("Xin hãy chọn ảnh");
    //   return;
    // }
    if (this.isAddMode) {
      this.create();
    } else {
      this.update();
    }
  }

  create() {

    const formData: FormData = this.convertToFormData();
    this.confirmationService
      .confirm('Bạn chắc chắn muốn làm điều này?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.memberTripService
            .createTrip(formData)
            .subscribe({
              next: (res) => {
                this.onSuccess('Tạo chuyến đi thành công');
              },
              // error: (error) => {
              //   this.onFailed(error);
              // },
            });
        } else {
          // Handle cancellation
        }
      });
  }

  private convertToFormData() {
    const formData: FormData = new FormData();
    formData.append('title', this.tripForm.get('title').value);
    formData.append('cityId', this.tripForm.get('cityId').value);
    formData.append('tripLevel', this.tripForm.get('tripLevel').value.value);
    formData.append('summary', this.tripForm.get('summary').value);
    formData.append('price', this.tripForm.get('price').value);
    formData.append('groupSize', this.tripForm.get('groupSize').value);
    formData.append('minAge', this.tripForm.get('minAge').value);
    formData.append('maxAge', this.tripForm.get('maxAge').value);
    var startDateStr = new Date(moment(this.tripForm.get('startDate').value).format('YYYY-MM-DD')).toISOString();
    // var startDateStr = (new Date(this.tripForm.get('startDate').value)).toISOString();
    formData.append('startDate', startDateStr);

    var endDateStr = new Date(moment(this.tripForm.get('endDate').value).format('YYYY-MM-DD')).toISOString();
    // var endDateStr = (new Date(this.tripForm.get('endDate').value)).toISOString();
    formData.append('endDate', endDateStr);
    var notes = this.tripForm.get('notes').value;
    if (notes) {
      formData.append('notes', this.tripForm.get('notes').value);
    }
    var cancelOneMonth = this.tripForm.get('cancelOneMonth').value;
    if (cancelOneMonth) {
    formData.append('cancelOneMonth', this.tripForm.get('cancelOneMonth').value);
    }
    var cancelOneWeek = this.tripForm.get('cancelOneWeek').value;
    if (cancelOneWeek) {
    formData.append('cancelOneWeek', this.tripForm.get('cancelOneWeek').value);
    }
    var cancelOneDay = this.tripForm.get('cancelOneDay').value;
    if (cancelOneDay) {
    formData.append('cancelOneDay', this.tripForm.get('cancelOneDay').value);
    }
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    } 

    // Loop through each item in the FormArray
    const tripDays = this.tripForm.get('tripDays').value;
    if (!Array.isArray(this.tripDays) || !this.tripDays.length) {
      formData.append('tripDaysJson', JSON.stringify(tripDays));
    }
    if (this.selectedImagesFileList) {
      for (let i = 0; i < this.selectedImagesFileList.length; i++) {
        formData.append('images', this.selectedImagesFileList.item(i));
      }
    }
    if (this.existedImagesAnyArray) {
      this.existedImagesAnyArray.forEach(image => {
        formData.append('existedImages', image.id);
      });
    }
    // formData.forEach((value, key) => {
    //   console.log(`Key: ${key}, Value: ${value}`);
    // });
    return formData;
  }

  update() {
    // if (this.selectedImage == null && this.existingImage == null) {
    //   this.onFailed("Xin hãy chọn ảnh bìa");
    //   return;
    // }
    // if (this.existedImagesFileArray.length == 0 && this.selectedImagesFileArray.length == 0) {
    //   this.onFailed("Xin hãy chọn ảnh");
    //   return;
    // }
    const formData: FormData = this.convertToFormData();

    this.confirmationService
      .confirm('Bạn chắc chắn muốn làm điều này?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.memberTripService
            .updateTrip(this.tripId, formData)
            .subscribe({
              next: (res) => {
                this.onSuccess('Điều chỉnh chuyến đi thành công');
              },
              // error: (error) => {
              //   this.onFailed(error);
              // },
            });
        } else {
          // Handle cancellation
        }
      });

  }
  private onSuccess(message: string) {
    this.snackBar.open(message, 'OK', { duration: 5000 });
    this.location.back();
  }
  private onFailed(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 10000,
      panelClass: 'error-snackbar',
    });
  }
}
