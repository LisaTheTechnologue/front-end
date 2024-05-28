
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ErrorDialogComponent } from 'src/app/_shared/components/error-dialog/error-dialog.component';
import { ConfirmService } from 'src/app/_shared/services/confirm.service';
import { MemberPaymentService } from 'src/app/_shared/services/member-payment.service';
import { MemberJoinerService } from 'src/app/_shared/services/member-joiner.service';
import { PublicService } from 'src/app/_shared/services/public.service';
import { PageNotFoundException } from 'src/app/_shared/exceptions/page-not-found.exception';
import { StorageService } from 'src/app/_shared/services/storage.service';
@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css'],
})
export class PaymentViewComponent {
  payment:any;
  paymentId = this.activatedRoute.snapshot.params['paymentId'];
  trip: any;
  selfPayment: boolean = false;
  constructor(
    private paymentService: MemberPaymentService,
    private publicService: PublicService,
    private confirmationService: ConfirmService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPayment();
  }

  getPayment() {
    const userId = StorageService.getUserId();
    this.paymentService.getById(this.paymentId).subscribe(
      (res) => {
        // Handle successful response
        this.payment = res;
        this.payment.imageURL = 'data:image/jpeg;base64,' + res.byteImg;
        this.getTrip(res.tripId);
        if(this.payment.payerId==userId){
          this.selfPayment = true;
        }
      },
      // (error) => {
      //   // Handle error response
      //   this.showError(error);
      // }
    );
  }
  getTrip(tripId: number){
    this.publicService.getByTripId(tripId).subscribe(
      (res) => {
        // Handle successful response
        this.trip = res;
      },
      // (error) => {
      //   // Handle error response
      //   this.showError(error);
      // }
    );
  }
  changeStatus(status:string) {
    this.confirmationService.confirm('Are you sure you want to do this?')
      .subscribe(confirmed => {
        if (confirmed) {
          // Perform action upon confirmation
          this.paymentService.update({
            'id':this.payment.id,
            'tripId':this.payment.tripId,
            'payerId': this.payment.payerId,
            'paymentStatus': status}).subscribe(
            (res) => {
              // Handle successful response
              this.onSuccess('Payment ' + status);
              this.onCancel();
            },
            // (error) => {
            //   // Handle error response
            //   this.showError(error);
            // }
          );
        } else {
          // Handle cancellation
        }
      });
  }

  // reject() {
  //   this.confirmationService.confirm('Reject this payment?')
  //     .subscribe(confirmed => {
  //       if (confirmed) {
  //         // Perform action upon confirmation
  //         this.paymentService.update({
  //           'tripId':this.payment.tripId,
  //           'payerId': this.payment.payerId,
  //           'paymentStatus': 'rejected'}).subscribe(
  //           (res) => {
  //             // Handle successful response
  //             this.onSuccess('Payment rejected');
  //             this.onCancel();
  //           },
  //           (error) => {
  //             // Handle error response
  //             this.showError(error);
  //           }
  //         );
  //       } else {
  //         // Handle cancellation
  //       }
  //     });
  // }

  onCancel() {
    this.router.navigateByUrl('/member');
  }
  private onSuccess(message:any) {
    this.snackBar.open(message, '', { duration: 5000 });
    this.onCancel();
  }
  showError(error: any) {
    if (error instanceof PageNotFoundException) {
      this.router.navigate(['/page-not-found']);
    } else {

    this.dialog.open(ErrorDialogComponent, {
      data: 'Something is wrong. Please retry!',
    });
  }
  }
}
