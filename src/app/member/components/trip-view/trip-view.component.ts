import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip, TripMember } from 'src/app/_shared/models/trip.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/_shared/services/app.service';
import { StorageService } from '../../../_shared/services/storage.service';
import { MemberJoinerService } from 'src/app/_shared/services/member-joiner.service';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.css'],
})
export class TripViewComponent {
  isJoined: boolean;
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  hideChat= false;
  constructor(
    private memberJoinerService: MemberJoinerService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private appService: AppService,
    private router: Router
  ) {}
  ngOnInit() {
    this.appService.getIsJoined.subscribe(isJoined => this.isJoined = isJoined);
  }

  joinTrip() {
    this.memberJoinerService.createJoin(this.tripId).subscribe((res) => {
      if (res.id != null) {
        this.snackBar.open('You have registered to the trip successfully!', 'Close', {
          duration: 5000,
        });
        this.router.navigateByUrl('/member/joined-trips');
      } else {
        this.snackBar.open(res.message, 'ERROR', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      }
    });
  }
  revokeJoinTrip() {
    this.memberJoinerService.cancel(this.tripId).subscribe((res) => {
      if (res.id != null) {
        this.snackBar.open('You have revoked of the trip successfully!', 'Close', {
          duration: 5000,
        });
        this.router.navigateByUrl('/member/joined-trips');
      } else {
        this.snackBar.open(res.message, 'ERROR', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      }
    });
  }
  openChat() {
      this.hideChat = !this.hideChat;
  }
}
