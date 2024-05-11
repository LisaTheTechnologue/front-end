import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  UntypedFormArray,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ErrorDialogComponent } from 'src/app/_shared/components/error-dialog/error-dialog.component';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { Location } from '@angular/common';
import { Trip, TripDay } from 'src/app/_shared/models/trip.model';
import { PublicService } from 'src/app/_shared/services/public.service';
import { MemberTripService } from 'src/app/_shared/services/member-trip.service';
@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css'],
})
export class TripEditComponent {
  tripForm!: FormGroup;
  tripId: number = this.route.snapshot.params['tripId'];
  listOfCities: any = [];

  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  existingImage: string | null = null;
  imageChanged = false;

  startDateModel: NgbDateStruct;
  startDate: Date;
  endDate: Date;
  endDateModel: NgbDateStruct;
  today = new Date();
  age: string;
  trip!: Trip;
  image: any;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private publicService: PublicService,
    private memberTripService: MemberTripService,
    private location: Location,
    private dialog: MatDialog,
    private router: Router,
    private config: NgbDatepickerConfig,
    private route: ActivatedRoute
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
    this.getTripById();
  }
  getTripById() {
    // this.trip = new Trip();
    const userId = StorageService.getUserId();
    this.memberTripService.getTripById(this.tripId).subscribe((res) => {
      // create lines array first
      for (let item = 0; item < res.tripDays.length; item++) {
        const itemsFormArray = this.tripForm.controls['items'] as FormArray;
        itemsFormArray.push(this.createItem(res));
      }
      let startDate = new Date(res.startDate);
      let startDateModel: NgbDateStruct =  {
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
        day: startDate.getDate()
      };
      this.tripForm.controls['startDateModel'].setValue(startDateModel);
      let endDate = new Date(res.endDate);
      let endDateModel: NgbDateStruct =  {
        year: endDate.getFullYear(),
        month: endDate.getMonth() + 1,
        day: endDate.getDate()
      };
      this.tripForm.controls['endDateModel'].setValue(endDateModel);
      this.tripForm.patchValue(res);
      // this.existingImage = 'data:image/jpeg;base64,' + res.byteImg;
      console.log(res);
      // this.trip = res;
      // this.trip.imageURL = 'data:image/jpeg;base64,' + res.byteImg;
      // this.image = this.trip.imageURL;
    });
  }

  // get items(): FormGroup {
  //   return this.fb.group({
  //     dayNo: ['', [Validators.required]],
  //     title: ['', [Validators.required]],
  //     description: ['', [Validators.required]],
  //   });
  // }
  get items() {
    return this.tripForm.controls['items'] as FormArray;
  }

  private retrieveItems(trip: Trip) {
    const items = [];
    if (trip?.tripDays) {
      trip.tripDays.forEach(item => items.push(this.createItem(item)));
    } else {
      items.push(this.createItem());
    }
    return items;
  }
  // getToday(): string {
  //   return new Date().toISOString().split('T')[0];
  // }
  getAllCities() {
    this.publicService.getAllCities().subscribe((res) => {
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
  private createItem(item: TripDay = { id: '', dayNo: 0, title: '', description: '' }) {
    return this.fb.group({
      id: [item.id],
      dayNo: [
        item.dayNo,
        [Validators.required]
      ],
      title: [
        item.title,
        [Validators.required]
      ],
      description: [
        item.description,
        [Validators.required]
      ]
    });
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

  submit(status: string): void {
    // if (this.tripForm.valid) {
    const formData: FormData = new FormData();
    const userId = StorageService.getUserId();
    if (this.imageChanged && this.selectedFile) {
      formData.append('img', this.selectedFile);
    }
    // formData.append('img', this.selectedFile);
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
    this.memberTripService
      .updateTrip(this.tripId,formData)
      .subscribe({ next: () => this.onSuccess(), error: () => this.onError() });
  }
  onCancel() {
    this.location.back();
  }
  private onSuccess() {
    this.snackBar.open('Course saved successfully!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.dialog.open(ErrorDialogComponent, {
      data: 'Error saving course.',
    });
  }
}
