import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { MemberJoinerService } from '../../_shared/services/member-joiner.service';
import { PageNotFoundException } from 'src/app/_shared/exceptions/page-not-found.exception';
import { Trip, TripMember } from 'src/app/_shared/models/trip.model';
import { PublicService } from 'src/app/_shared/services/public.service';
import { SharedDataService } from 'src/app/_shared/services/shared-data.service';
import { MemberTripService } from 'src/app/_shared/services/member-trip.service';
import { TripStatus } from 'src/app/_shared/models/enum.model';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.css'],
})
export class TripViewComponent implements OnInit {
  allTripStatuses: typeof  TripStatus = TripStatus;
  isJoined: boolean = false;
  isLeader: boolean = false;
  isGroupChatOpened: boolean = false;
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
    private memberJoinerService: MemberJoinerService,
    private snackBar: MatSnackBar,
    private sharedData: SharedDataService,
    private router: Router,
    private memberTripService: MemberTripService
  ) { }
  ngOnInit() {
    this.router.events.subscribe(event => {
      this.isMemberLoggedIn = StorageService.isMemberLoggedIn();
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    });
    this.userId = StorageService.getUserId();
    this.getTrip();
    // this.getMembers();
  }
  
  getTrip() {
    this.publicService.getByTripId(this.tripId).subscribe({
      next: (res) => {
        this.trip = res;
        this.trip.imageURL = 'data:image/jpeg;base64,' + res.byteImg;
        this.trip.byteImgs = res.images.map(img => `data:image/jpeg;base64,${img.imageByte}`);
        // this.trip.byteImgs = res.images;
        this.trip.tripDays = res.tripDays;
        if (this.trip.leaderId == this.userId) {
          this.isLeader = true;
        }
        // this.status.emit(this.trip.tripStatus);
        // this.returnedTrip.emit(this.trip);
        if (this.trip.tripStatus === TripStatus.END) {
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
  // getIsEnded($event: boolean) {
  //   this.isEnded = $event;
  //   }
  // getIsJoined($event: boolean) {
  //   this.isJoined = $event;
  // }
  // getIsLeader($event: boolean) {
  //   this.isLeader = $event;
  // }
  // getStatus($event: string) {
  //   if ($event == 'APPROVED') {
  //     this.isGroupChatOpened = true;
  //   }
  //   this.status = $event;
  // }
  // getTrip($event: Trip) {
  //   this.trip = $event;
  // }
  joinTrip() {
    this.router.navigateByUrl(`/member/payment/create/${this.tripId}`);
  }
  changeStatus(status: string) {
    this.memberTripService.changeStatus(this.tripId, status).subscribe((res) => {
      if (res.id != null) {
        this.snackBar.open('Updated Trip Status Successful!', 'Close', {
          duration: 5000,
        });
        this.router.navigateByUrl('/member');
      } else {
        this.snackBar.open(res.message, 'ERROR', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      }
    });
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
    this.snackBar.open(message, 'ERROR', {
      duration: 100000,
      panelClass: 'error-snackbar',
    });
  }
}
