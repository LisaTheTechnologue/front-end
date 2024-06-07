import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TripStatusPostDTO } from 'src/app/_shared/models/trip.model';
import { AdminTripService } from 'src/app/_shared/services/admin-trip.service';
import { AdminUserService } from 'src/app/_shared/services/admin-user.service';
import { MemberTripService } from 'src/app/_shared/services/member-trip.service';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { ChangeStatusDialogComponent } from 'src/app/profile/change-status-dialog/change-status-dialog.component';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {
  form: FormGroup;
  statusSelected: string = '';
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();
  showDialog = false;
  constructor(
    private adminService: AdminTripService,
    private memberService: MemberTripService,
    public dialogRef: MatDialogRef<ChangeStatusDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,    
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) { 
      this.form = this.fb.group({
        tripId: this.data.tripId,
        status: this.data.status,
        reason: ['', [Validators.required, Validators.maxLength(50)]],
      });
      this.statusSelected = this.form.get('reason')?.value || '';
    
    }

  ngOnInit() {
  }
  closeDialog(): void {
    this.dialogRef.close(false); 
    // this.showRejectDialog = false;
    this.statusSelected = ''; // Clear reason on close
  }
  submit(): void {  
    let dto: TripStatusPostDTO = {
      tripId: this.form.get('tripId')?.value,
      status: this.form.get('status')?.value,
      message: this.form.get('reason')?.value,
    }
    if(this.isAdminLoggedIn) {
      this.adminService.changeStatus(dto).subscribe((res) => {
        if (res.id != null) {
          this.snackBar.open('Chuyển trạng thái thành công!', 'Close', {
            duration: 5000,
          });
          window.location.reload();
        } else {
          this.snackBar.open(res.message, 'X', {
            duration: 5000,
            panelClass: 'error-snackbar',
          });
        }
      });
    } else {
    this.memberService.changeStatus(dto).subscribe((res) => {
      if (res.id != null) {
        this.snackBar.open('Chuyển trạng thái thành công!', 'Close', {
          duration: 5000,
        });
        window.location.reload();
      } else {
        this.snackBar.open(res.message, 'X', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      }
    });
  }
  }
  onCancel() {
    this.router.navigateByUrl('/admin');
  }
  private onSuccess(message: any) {
    this.snackBar.open(message, '', { duration: 5000 });
    this.onCancel();
  }

}
