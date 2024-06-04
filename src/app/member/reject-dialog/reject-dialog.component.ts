import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MemberPaymentService } from 'src/app/_shared/services/member-payment.service';
interface Reason {
  value: string;
}
@Component({
  selector: 'app-reject-dialog',
  templateUrl: './reject-dialog.component.html',
  styleUrls: ['./reject-dialog.component.css']
})
export class RejectDialogComponent implements OnInit {
  form: FormGroup;
  reasonSelected: string = '';
  reasons: Reason[] = [
    { value: 'Không tiếp tục tham gia' },
    { value: 'Không thể liên lạc được' },
    { value: 'Khác' }
  ];
  showRejectDialog = false;
  constructor(private paymentService: MemberPaymentService,
    public dialogRef: MatDialogRef<RejectDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,    
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder) { 
      this.form = this.fb.group({
        reason: ['', Validators.required],
        other: ['']
      });
      this.reasonSelected = this.form.get('reason')?.value || '';
      this.form.get('reason')?.valueChanges.subscribe(value => {
        this.reasonSelected = value;
        if(value=='Khác'){
          this.form.controls['other'].setValidators([Validators.required, Validators.maxLength(250)]);
        } else {
          this.form.get('other')?.clearValidators();
        }
        this.form.controls['other'].updateValueAndValidity();
      });
      
    }

  ngOnInit() {
  }
  closeRejectDialog(): void {
    this.dialogRef.close(); 
    // this.showRejectDialog = false;
    this.reasonSelected = ''; // Clear reason on close
  }

  submitRejection(): void {
    const status = 'REJECT'; // Assuming your rejected payment status
    if(this.reasonSelected=='Khác'){
      this.reasonSelected = this.form.get('other')?.value;
    }

    this.paymentService.update({
      id: this.data.id,
      tripId: this.data.tripId,
      payerId: this.data.payerId,
      paymentStatus: status,
      rejectionReason: this.reasonSelected
    }).subscribe(() => {
      // Handle success (optional: show success message)
      this.closeRejectDialog();
      this.onSuccess("Từ chối thông tin chuyển khoản thành công")
    }, (error) => {
      // Handle errors (optional: show error message)
    });
  }
  onCancel() {
    this.router.navigateByUrl('/member');
  }
  private onSuccess(message: any) {
    this.snackBar.open(message, '', { duration: 5000 });
    this.onCancel();
  }
}
