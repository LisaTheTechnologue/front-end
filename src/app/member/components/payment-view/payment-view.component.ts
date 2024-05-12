
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ErrorDialogComponent } from 'src/app/_shared/components/error-dialog/error-dialog.component';
import { ConfirmService } from 'src/app/_shared/services/confirm.service';
import { MemberPaymentService } from 'src/app/_shared/services/member-payment.service';
import { MemberJoinerService } from 'src/app/_shared/services/member-joiner.service';
import { PublicService } from 'src/app/_shared/services/public.service';
@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css'],
})
export class PaymentViewComponent {
  payment:any;
  paymentId = this.activatedRoute.snapshot.params['paymentId'];
  trip: any;
  tripId:any;

  constructor(
    private paymentService: MemberPaymentService,
    private publicService: PublicService,
    private joinerService: MemberJoinerService,
    private confirmationService: ConfirmService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPayment();
    this.getTrip();
  }

  getPayment() {
    this.paymentService.getById(this.paymentId).subscribe(
      (res) => {
        // Handle successful response
        this.payment = res;
        this.tripId = res.joiner.tripId;
      },
      (error) => {
        // Handle error response
        this.showError(error);
      }
    );
  }
  getTrip(){
    this.publicService.getByTripId(this.paymentId).subscribe(
      (res) => {
        // Handle successful response
        this.trip = res;
      },
      (error) => {
        // Handle error response
        this.showError(error);
      }
    );
  }
  confirm() {
    this.confirmationService.confirm('Are you sure you want to do this?')
      .subscribe(confirmed => {
        if (confirmed) {
          // Perform action upon confirmation
          this.joinerService.approve(this.paymentId).subscribe(
            (res) => {
              // Handle successful response
              this.onSuccess('Confirmed payment');
              this.onCancel();
            },
            (error) => {
              // Handle error response
              this.showError(error);
            }
          );
        } else {
          // Handle cancellation
        }
      });
  }

  reject() {
    this.confirmationService.confirm('Are you sure you want to do this?')
      .subscribe(confirmed => {
        if (confirmed) {
          // Perform action upon confirmation
          this.joinerService.reject(this.paymentId).subscribe(
            (res) => {
              // Handle successful response
              this.onSuccess('Payment rejected');
              this.onCancel();
            },
            (error) => {
              // Handle error response
              this.showError(error);
            }
          );
        } else {
          // Handle cancellation
        }
      });
  }

  onCancel() {
    this.location.back();
  }
  private onSuccess(message:any) {
    this.snackBar.open(message, '', { duration: 5000 });
    this.onCancel();
  }
  showError(error: any) {
    this.dialog.open(ErrorDialogComponent, {
      data: 'Something is wrong. Please retry!',
    });
  }
}
