import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/_shared/components/error-dialog/error-dialog.component';
import { Location } from '@angular/common';
import { PageNotFoundException } from 'src/app/_shared/exceptions/page-not-found.exception';
@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent {

  payments: any[]=[];
  // searchTripForm!:FormGroup;
  searchText: string = '';
  error: any;
  constructor(
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,
    private router: Router){}

  ngOnInit(){
    const userId = StorageService.getUserId();
    this.getListPayment(userId);
  }

  getListPayment(userId:any) {
    this.paymentService.getListPayment(userId).subscribe({
      next: (res) => {
        // Handle successful response
        this.payments = res;
      },
      error: (error) => {
        if (error instanceof PageNotFoundException) {
          this.router.navigate(['/page-not-found']);
        } else {
          // Handle other errors here
          this.error = error.message;
        }
      }}
    );
  }

  onCancel() {
    this.location.back();
  }

  showError(error: any) {
    this.dialog.open(ErrorDialogComponent, {
      data: error,
    });
  }
}
