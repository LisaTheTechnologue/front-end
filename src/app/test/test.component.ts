import { AfterViewInit, Component, OnInit, VERSION, ViewChild, effect } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Trip } from '../_shared/models/trip.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PublicService } from '../_shared/services/public.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../_shared/services/confirm.service';
import { FormUtilsService } from '../_shared/services/form-utils.service';
import { MemberTripService } from '../_shared/services/member-trip.service';
import { SharedDataService } from '../_shared/services/shared-data.service';
import { UploadImageService } from '../_shared/services/upload-image.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  tripForm!: FormGroup;
  listOfCities: any = [];
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
    // private memberTripService: MemberTripService,
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
    // this.minDate = new Date();
  }
  ngOnInit(): void {
    this.isAddMode = !this.tripId;

    this.initForm();

    this.getAllCities();
    // if (!this.isAddMode) {
    //   this.getTripById();
    // } else if (this.sharedData.getData()!=null) {
    //   this.populateForm(this.sharedData.getData());
    //   this.sharedData.setData(null);
    // }
  }

  initForm() {
    this.tripForm = this.fb.group({

      title: new FormControl(''),
      summary: new FormControl(''),
      notes: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      groupSize: new FormControl(''),
      price: new FormControl(''),
      minAge: new FormControl(''),
      maxAge: new FormControl(''),
      tripLevel: new FormControl(''),
      cityId: new FormControl(''),
      image: new FormControl(null),
      images: this.fb.array([]),
      youtubeURLs: this.fb.array([]),
      // tripDays: this.fb.array([])
      tripDays: this.fb.array([])
    });
  }
  // images(): FormArray {
  //   return this.tripForm.get('images') as FormArray;
  // }

  // newImage(): FormGroup {
  //   return this.fb.group({
  //     imageFile: new FormControl(null),
  //     imageURL: new FormControl(''),
  //     imageName:new FormControl(''),
  //   });
  // }

  // addImage() {
  //   this.images().push(this.newImage());
  // }
  // imageSelectedMulti: File;
  // onImageSelected(event: any, index: number) {
  //   this.imageSelectedMulti = event.target.files[0];
  //   this.images().at(index).setValue({
  //     imageFile: this.imageSelectedMulti
  // }); // Update imageFile control
  // }

  // removeImage(index: number) {
  //   this.images().removeAt(index);
  // }

  youtubeURLs(): FormArray {
    return this.tripForm.get('youtubeURLs') as FormArray;
  }

  newYoutubeURL(): FormGroup {
    return this.fb.group({
      youtubeURL: ''
    });
  }

  addYoutubeURL() {
    // const tripDays = this.tripForm.get('tripDays') as UntypedFormArray;
    this.youtubeURLs().push(this.newYoutubeURL());
  }

  removeYoutubeURL(index: number) {
    this.tripDays().removeAt(index);
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
    // const tripDays = this.tripForm.get('tripDays') as UntypedFormArray;
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

  // getTripById() {
  //   // this.trip = new Trip();
  //   // const userId = StorageService.getUserId();
  //   this.memberTripService.getTripById(this.tripId).subscribe((res) => {
  //     // create lines array first
  //     this.populateForm(res);
  //     // console.log(res);
  //   });
  // }
  // private populateForm(res: any) {
  //   res.tripDays.forEach(element => {
  //     var day: FormGroup = this.newTripDay();
  //     this.tripDays().push(day);

  //     element.activities.forEach(a => {
  //       var activity = this.newActivity();

  //       (day.get("activities") as FormArray).push(activity);
  //     });
  //   });
  //   this.tripForm.patchValue(res);
  //   this.existingImage = 'data:image/jpeg;base64,' + res.byteImg;
  //   res.byteImgs.forEach(element => {
  //     this.existedImages.push(element);
  //   }
  //   )
  // }

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

  existedImages: File[];
  onImagesSelected(event: File[]) {
    this.selectedFiles = event;
    // this.tripForm.patchValue({ images: this.selectedFiles});
    this.tripForm.setControl('images', this.fb.array(this.selectedFiles || []));
  }
  selectedImage: File|null;
  onSelectedImage(event: File) {
    this.selectedImage = event;
    this.tripForm.patchValue({ image: this.selectedImage});
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

  selectedImages!: FileList;
  // file!: file;
  selectedFiles: File[] = [];
  onFileSelected(event: any) {
    this.selectedImages = event.target.files;
    if (this.selectedImages.length > 0) {
    for (let i = 0; i < this.selectedImages.length; i++) {      
      const file = this.selectedImages[i];
      // const fileSize = file.size; 
      // if (fileSize > (this.limitFileSize * this.MAX_FILE_SIZE)) { // 1 MB in bytes
      //   this.onFailed('File size exceeds the maximum limit of ' + this.limitFileSize + ' KB.');
      //   files = null;
      //   break;
      // }
      this.selectedFiles.push(file);
    }
  }
    // this.imagesSelected.emit(this.selectedImages); // Emit updated images list
  }


  create() {
    // if (this.selectedFile != null) {
    console.log(this.tripForm.value);
    // this.confirmationService
    //   .confirm('Are you sure you want to submit this?')
    //   .subscribe((confirmed) => {
    //     if (confirmed) {
      const formData: FormData = new FormData();
      formData.append('title', this.tripForm.get('title').value);
   for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('images', this.selectedImages.item(i));
   }
    this.publicService
      .createTrip(formData)
      .subscribe(
      (res) => {          
          this.onSuccess('Created Trip Successfully');
        },
        
      );
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
