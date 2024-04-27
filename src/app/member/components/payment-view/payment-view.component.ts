import { ConfirmationDialogComponent } from './../../../_shared/components/confirmation-dialog/confirmation-dialog.component';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { Location } from '@angular/common';
import { ErrorDialogComponent } from 'src/app/_shared/components/error-dialog/error-dialog.component';
import { ConfirmService } from 'src/app/_shared/services/confirm.service';
@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css'],
})
export class PaymentViewComponent {
  payment:any;
  paymentId = this.activatedRoute.snapshot.params['paymentId'];
  constructor(
    private paymentService: PaymentService,
    private confirmationService: ConfirmService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.paymentService.getPaymentById(this.paymentId).subscribe(
      (res) => {
        // Handle successful response
        this.payment = res;
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
          this.paymentService.confirm(this.paymentId).subscribe(
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
          this.paymentService.fail(this.paymentId).subscribe(
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
      data: error,
    });
  }
}
