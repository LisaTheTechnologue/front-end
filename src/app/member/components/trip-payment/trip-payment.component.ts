import { Component, Input } from '@angular/core';
import { Trip } from 'src/app/_shared/models/trip.model';
import {  PaymentProfile, PublicProfile } from 'src/app/_shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from 'src/app/_shared/components/error-dialog/error-dialog.component';
import { Location } from '@angular/common';
import { MemberUserService } from 'src/app/_shared/services/member-user.service';
import { UserService } from '../../../_shared/services/user.service';
import { MemberPaymentService } from 'src/app/_shared/services/member-payment.service';
import { MemberTripService } from 'src/app/_shared/services/member-trip.service';
import { PublicService } from 'src/app/_shared/services/public.service';
import { ConfirmDialogComponent } from 'src/app/_shared/components/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-trip-payment',
  templateUrl: './trip-payment.component.html',
  styleUrls: ['./trip-payment.component.css'],
})
export class TripPaymentComponent {
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  trip!: Trip;
  profile: PaymentProfile;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  paymentForm!: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private publicService: PublicService,
    private userService: MemberUserService,
    private paymentService: MemberPaymentService,
    private location: Location,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getTrip();
    this.paymentForm = this.fb.group({
      notes: [null, []],
    });
  }
  getTrip(){
    this.publicService.getByTripId(this.tripId).subscribe((res) => {
      this.trip = res;
      this.trip.leaderId = res.leaderId;
      this.getPaymentProfileByUserId(this.trip.leaderId);
      this.trip.imageURL = 'data:image/jpeg;base64,' + res.byteImg;
    });
  }
  getPaymentProfileByUserId(leaderId: number) {
    this.userService.getPaymentProfileByUserId(leaderId)
    .subscribe((res) => {
      this.profile = res;
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
  submit() {

    const formData: FormData = new FormData();
    const userId = StorageService.getUserId();
    const tripId = this.tripId + '';
    formData.append('img', this.selectedFile);
    formData.append('payerId', userId);
    formData.append('tripId', tripId);
    formData.append('notes', this.paymentForm.get('notes').value);
    this.paymentService.create(formData).subscribe({
      next: (res) => {
        this.onSuccess("Payment sent successfully! Please wait for the leader's approval");
      },
      error: (error) => {
        this.onFailed(error);
      },
  });
  }

  onCancel() {
    this.location.back();
  }
  private onSuccess(message: string) {
    this.snackBar.open(
      message,
      '',
      { duration: 5000 }
    );
    this.onCancel();
  }
  private onFailed(message: string) {
    this.snackBar.open(
      message,
      'ERROR',
      {
        duration: 100000,
        panelClass: 'error-snackbar',
      }
    );
    this.onCancel();
  }
}
