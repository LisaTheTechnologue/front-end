import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from 'src/app/_shared/models/trip.model';
import { MemberTripService } from 'src/app/_shared/services/member-trip.service';
import { SharedDataService } from 'src/app/_shared/services/shared-data.service';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.css']
})
export class TripViewComponent {
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  isJoined: boolean;
  isEnded: boolean;
  isLeader: boolean;
  isGroupChatOpened: boolean = false;
  trip: Trip;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private memberTripService: MemberTripService,
    private sharedData: SharedDataService
  ) {}
  getIsEnded($event: boolean) {
    this.isEnded = $event;
    }
  getIsJoined($event: boolean) {
    this.isJoined = $event;
    }
  getIsLeader($event: boolean) {
    this.isLeader = $event;
  }
  getStatus($event: string) {
    if($event == 'APPROVED') {
      this.isGroupChatOpened = true;
    }
  }
  getTrip($event: Trip) {
    this.trip = $event;
  }
  changeStatus(status: string) {
    this.memberTripService.changeStatus(this.tripId,status).subscribe((res) => {
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

  copyData(){
    this.sharedData.setData(this.trip);
    this.router.navigateByUrl('/member/trips/create');
  }
}
