import { Component, Input } from '@angular/core';
import { Trip } from 'src/app/_shared/models/trip.model';
import { MemberService } from '../../services/member.service';
import { PublicService } from 'src/app/_shared/services/public.service';
import { User } from 'src/app/_shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from 'src/app/_shared/components/error-dialog/error-dialog.component';
import { Location } from '@angular/common';
import { PaymentService } from '../../services/payment.service';
@Component({
  selector: 'app-trip-payment',
  templateUrl: './trip-payment.component.html',
  styleUrls: ['./trip-payment.component.css'],
})
export class TripPaymentComponent {
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  trip!: Trip;
  user: User;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private publicService: PublicService,
    private location: Location,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.publicService.getById(this.tripId).subscribe((res) => {
      this.trip = res;
    });
    this.paymentService
      .getSellerInfo(this.trip.leaderId)
      .subscribe((user) => (this.user = user));
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
    const tripId =  this.tripId + '';
    formData.append('img', this.selectedFile);
    formData.append('payerId', userId);
    formData.append('tripId', tripId);
    this.paymentService.createPayment(formData).subscribe(
      (res) => {
        this.onSuccess();
      },
      (error) => {
        this.showError(error);
      }
    );
  }

  onCancel() {
    this.location.back();
  }
  private onSuccess() {
    this.snackBar.open('Trip saved successfully!', '', { duration: 5000 });
    this.onCancel();
  }

  showError(error: any) {
    this.dialog.open(ErrorDialogComponent, {
      data: error,
    });
  }
}
