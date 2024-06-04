import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip, Feedback } from '../_shared/models/trip.model';
import { PublicService } from '../_shared/services/public.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageNotFoundException } from '../_shared/exceptions/page-not-found.exception';
import { StorageService } from '../_shared/services/storage.service';
import { ConfirmService } from '../_shared/services/confirm.service';
import { AdminUserService } from '../_shared/services/admin-user.service';
import { User } from '../_shared/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeStatusDialogComponent } from './change-status-dialog/change-status-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  rating!:number;
  leaderId: number = this.route.snapshot.params['userId'];
  // User whose profile page you are on
  user: User | undefined;
  // Person logged in email
  currentUserEmail = '';
  trips: Trip[] | undefined;
  selfProfileCheck = false;
  selectedTrip: Trip;
  feedbacks: Feedback[];
  error: any;
  isAdminLoggedIn: boolean = false;
  userForm!: FormGroup;
  constructor(
    private publicService: PublicService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private confirmService: ConfirmService,
    private adminService: AdminUserService,    
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.getUser();
    this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    this.userForm = this.fb.group({
      id:[null, []],
      status: [null, [Validators.required]],
      userId:[null, []]
    });
  }
  
  getFeedbacksByTripId(tripId: number) {
    this.publicService.getFeedbacksByTripId(tripId).subscribe((res) => (this.feedbacks = res));
  }

  getUser() {
    // if (this.route.snapshot.params['member'] == null) {
      // Set user
      this.publicService
        .getByUserId(this.leaderId)
        .subscribe({
          next: (res) => {
            this.user = res;
            this.user.imageURL = 'data:image/jpeg;base64,' + res.byteImg;
            this.rating = res.rating;
          },
          // error: (error) => {
          //   if (error instanceof PageNotFoundException) {
          //     this.router.navigate(['/page-not-found']);
          //   } else {
          //     // Handle other errors here
          //     this.error = error.message;
          //   }
          // },
  });
      // Set trips
      this.publicService
        .getTripsByLeaderId(this.leaderId)
        .subscribe((trips) => (this.trips = trips));
  }

  display(trip: Trip) {
    this.selectedTrip = trip;
    this.selectedTrip.imageURL = 'data:image/jpeg;base64,' + trip.byteImg;
    this.getFeedbacksByTripId(this.selectedTrip.id);
  }

  displaySelectedTrip(trip: Trip) {
    return this.selectedTrip === trip;
  }

  // changeStatus(): void {
  //   this.userForm.setValue({ userId: this.user.id })
  //   this.confirmService
  //     .confirm('Are you sure you want to submit this?')
  //     .subscribe((confirmed) => {
  //       if (confirmed) {
  //         this.adminService.updateStatus(this.leaderId, this.userForm).subscribe({
  //           next: (res) => {              
  //               this.onSuccess('Update User Status Successfully');              
  //           },
  //           // error: (error) => {
  //           //   this.onFailed(error);
  //           // },
  //       })
  //       } else {
  //         // Handle cancellation
  //       }
  //     });
  //   } 
    openChangeStatusDialog(): void {
      let dialogRef = this.dialog.open(ChangeStatusDialogComponent, {
        width: '250px',
        data: {
          userId: this.user.id
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }

  private onSuccess(message: string) {
    this.snackBar.open(message, 'OK', { duration: 5000 });
    this.router.navigateByUrl('/admin');
  }
  private onFailed(message: string) {
    this.snackBar.open(message, 'ERROR', {
      duration: 100000,
      panelClass: 'error-snackbar',
    });
  }
}
