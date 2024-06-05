import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminUserService } from 'src/app/_shared/services/admin-user.service';
import { MemberPaymentService } from 'src/app/_shared/services/member-payment.service';
import { RejectDialogComponent } from 'src/app/member/reject-dialog/reject-dialog.component';
interface Status {
  label: string,
  value: string;
}
@Component({
  selector: 'app-change-status-dialog',
  templateUrl: './change-status-dialog.component.html',
  styleUrls: ['./change-status-dialog.component.css']
})
export class ChangeStatusDialogComponent implements OnInit {
  form: FormGroup;
  statusSelected: string = '';
  statuses: Status[] = [
    { label:"VIP", value: 'VIP' },
    { label:"Cảnh cáo", value: 'WARNING' },
    { label:"Bình thường", value: 'NORMAL' },
    { label:"Khóa tài khoản", value: 'BAN' },
  ];
  showDialog = false;
  constructor(
    private adminService: AdminUserService,
    public dialogRef: MatDialogRef<ChangeStatusDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,    
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) { 
      this.form = this.fb.group({
        status: ['', Validators.required],
      });
      this.statusSelected = this.form.get('status')?.value || '';
      this.form.get('status')?.valueChanges.subscribe(value => {
        this.statusSelected = value;        
      });      
    }

  ngOnInit() {
  }
  closeDialog(): void {
    this.dialogRef.close(); 
    // this.showRejectDialog = false;
    this.statusSelected = ''; // Clear reason on close
  }

  submit(): void {  
    this.adminService.updateStatus(this.data.userId
      // , this.statusSelected
    ).subscribe(() => {
      // Handle success (optional: show success message)
      this.closeDialog();
      this.onSuccess("Chuyển trạng thái thành công")
    }, (error) => {
      // Handle errors (optional: show error message)
    });
  }
  onCancel() {
    this.router.navigateByUrl('/admin');
  }
  private onSuccess(message: any) {
    this.snackBar.open(message, '', { duration: 5000 });
    this.onCancel();
  }
}
