import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/_shared/components/error-dialog/error-dialog.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent {

  payments: any[]=[];
  // searchTripForm!:FormGroup;
  searchText: string = '';
  constructor(
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar){}

  ngOnInit(){
    const userId = StorageService.getUserId();
    this.getListPayment(userId);
  }

  getListPayment(userId:any) {
    this.paymentService.getListPayment(userId).subscribe(
      res => {
        // Handle successful response
        this.payments = res;
      },
      error => {
        // Handle error response
        this.showError(error);
      }
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
