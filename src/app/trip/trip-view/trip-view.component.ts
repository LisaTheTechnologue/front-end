import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { MemberJoinerService } from '../../_shared/services/member-joiner.service';
import { PageNotFoundException } from 'src/app/_shared/exceptions/page-not-found.exception';
import { Trip, TripMember, TripStatusPostDTO } from 'src/app/_shared/models/trip.model';
import { PublicService } from 'src/app/_shared/services/public.service';
import { SharedDataService } from 'src/app/_shared/services/shared-data.service';
import { MemberTripService } from 'src/app/_shared/services/member-trip.service';
import { TripStatus } from 'src/app/_shared/models/enum.model';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { ConfirmDialogComponent } from 'src/app/_shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmService } from 'src/app/_shared/services/confirm.service';
import { AdminTripService } from 'src/app/_shared/services/admin-trip.service';
@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.css'],
})
export class TripViewComponent implements OnInit {

  isJoined: boolean = false;
  isLeader: boolean = false;
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  isMemberLoggedIn: boolean = StorageService.isMemberLoggedIn();
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();
  status: string;
  error: any;
  image: any;
  // tripId: number = this.activatedRoute.snapshot.params['tripId'];
  userId: any;
  trip!: Trip;
  members!: TripMember[];
  feedbacks: any[];
  constructor(private publicService: PublicService,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmService,
    private snackBar: MatSnackBar,
    private sharedData: SharedDataService,
    private router: Router,
    private memberTripService: MemberTripService,
    private dialog: MatDialog,
    private adminService: AdminTripService,
  ) { }
  ngOnInit() {
    
    this.userId = StorageService.getUserId();
    this.getTrip();
    // this.getMembers();
  }
  lightboxImages: any;
  getTrip() {
    this.publicService.getByTripId(this.tripId).subscribe({
      next: (res) => {
        this.trip = res;

        // this.trip.imageByte = res.imageByte;
        this.lightboxImages = res.images.map(img => `data:image/jpeg;base64,${img.imageByte}`);
        this.trip.imageBytes = res.images;
        this.trip.tripDays = res.tripDays;
        if (this.trip.leaderId == this.userId) {
          this.isLeader = true;
        }
        // this.status.emit(this.trip.tripStatus);
        // this.returnedTrip.emit(this.trip);
        if (this.trip.tripStatus == 'END') {
          this.publicService
            .getFeedbacksByTripId(this.tripId)
            .subscribe((res) => (this.feedbacks = res));
          // this.isEnded.emit(true);
        } else {
          // this.isEnded.emit(false);
        }
        if (res.joiners.length > 0) {
          this.members = res.joiners;
          if (this.isMemberLoggedIn) {
            for (var index in this.members) {
              if (this.members[index].userId === this.userId) {
                this.isJoined = true;
                break;
              }
            }
          } else {
            // this.isJoined.emit(false);
          }
        } else {
          // this.isJoined.emit(false);
        }
      },
    });
  }
  joinTrip() {
    this.router.navigateByUrl(`/member/payment/create/${this.tripId}`);
  }
  changeStatus(status: string) {
    let dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: {
        status: status,
        tripId: this.tripId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Check if the result is truthy (meaning user clicked OK)
        window.location.reload();
      }
    });
  }
  memberChangeStatus(status: string) {
    let dto: TripStatusPostDTO = {
      tripId: this.tripId,
      status: status,
      message: ''
    }
    this.confirmationService
      .confirm('Bạn chắc chắn muốn làm điều này?')
      .subscribe((confirmed) => {
        if (confirmed) {
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
          this.memberTripService.changeStatus(dto).subscribe((res) => {
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
        } else {
          // Handle cancellation
        }
      }
      );
  }

  copyData() {
    this.sharedData.setData(this.trip);
    this.router.navigateByUrl('/member/trips/create');
  }
  private onSuccess(message: string) {
    this.snackBar.open(message, 'OK', { duration: 5000 });
    this.router.navigateByUrl('/admin');
  }
  private onFailed(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 10000,
      panelClass: 'error-snackbar',
    });
  }
}
