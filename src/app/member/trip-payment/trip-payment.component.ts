import { Component, Input } from '@angular/core';
import { Trip } from 'src/app/_shared/models/trip.model';
import { User } from 'src/app/_shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from 'src/app/_shared/components/error-dialog/error-dialog.component';
import { Location } from '@angular/common';
import { MemberUserService } from 'src/app/_shared/services/member-user.service';
import { UserService } from '../../_shared/services/user.service';
import { MemberPaymentService } from 'src/app/_shared/services/member-payment.service';
import { MemberTripService } from 'src/app/_shared/services/member-trip.service';
import { PublicService } from 'src/app/_shared/services/public.service';
import { ConfirmDialogComponent } from 'src/app/_shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmService } from 'src/app/_shared/services/confirm.service';
@Component({
  selector: 'app-trip-payment',
  templateUrl: './trip-payment.component.html',
  styleUrls: ['./trip-payment.component.css'],
})
export class TripPaymentComponent {
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  trip!: Trip;
  user!: User;
  rating!:number;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  paymentForm!: FormGroup;
  isLoading = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private publicService: PublicService,
    private confirmationService: ConfirmService,
    private paymentService: MemberPaymentService,
    private location: Location,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getTrip();
    this.paymentForm = this.fb.group({
      amount: [null, [Validators.required]],
      notes: [null, []],
    });
  }
  getTrip(){
    this.publicService.getByTripId(this.tripId).subscribe({
      next: (res) => {
        this.trip = res;
        this.getProfile(this.trip.leaderId);
        this.trip.imageURL = 'data:image/jpeg;base64,' + res.byteImg;
      },
      // error: (error) => {
      //   this.onFailed(error);
      // },
    });
  }
  getProfile(userId:number) {
    this.publicService.getByUserId(userId)
    .subscribe((res) => {      
      this.user = res;
      if(res.byteImg != null ) {
        this.user.imageURL = 'data:image/jpeg;base64,' + res.byteImg;
      }
      this.rating = res.rating;
    });
  }
  selectedImage(event: File) {
    this.selectedFile = event;
    // this.imageChanged = true;
  }
  submit() {
    this.isLoading = true;
    if(this.selectedFile!=null) {
      this.confirmationService
      .confirm('Are you sure you want to submit this?')
      .subscribe((confirmed) => {
        if (confirmed) {
            const formData: FormData = new FormData();
            const userId = StorageService.getUserId();
            const tripId = this.tripId + '';
            formData.append('img', this.selectedFile);
            formData.append('payerId', userId);
            formData.append('tripId', tripId);
            formData.append('amount', this.paymentForm.get('amount').value);
            formData.append('notes', this.paymentForm.get('notes').value);
            this.paymentService.create(formData).subscribe({
              next: (res) => {
                this.isLoading = false;
                this.onSuccess("Payment sent successfully! Please wait for the leader's approval");
              },
              error: (error) => {
                this.isLoading = false;
                this.onFailed(error.message);
              },
            });        
          } else {
            // Handle cancellation
          }}
        );
    } else {
      this.onFailed("Image is required.");
    }
  }

  onCancel() {
    this.location.back();
  }
  private onSuccess(message: string) {
    this.snackBar.open(
      message,
      'OK',
      { duration: 5000 }
    );
    this.onCancel();
  }
  private onFailed(message: string) {
    this.snackBar.open(
      message,
      'ERROR',
      {
        duration: 5000,
        panelClass: 'error-snackbar',
      }
    );
  }
}
