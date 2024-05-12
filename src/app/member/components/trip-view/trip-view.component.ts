import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip, TripMember } from 'src/app/_shared/models/trip.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/_shared/services/app.service';
import { StorageService } from '../../../_shared/services/storage.service';
import { MemberJoinerService } from 'src/app/_shared/services/member-joiner.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.css'],
})
export class TripViewComponent {
  isJoined: boolean;
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  hideChat = false;
  constructor(
    private memberJoinerService: MemberJoinerService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private appService: AppService,
    private location: Location,
    private router: Router
  ) {}
  ngOnInit() {
    this.appService.getIsJoined.subscribe(
      (isJoined) => (this.isJoined = isJoined)
    );
  }

  revokeJoinTrip() {
    this.memberJoinerService.cancel(this.tripId).subscribe({
      next: (res) => {
        this.onSuccess('You have revoked of the trip successfully!');
        this.router.navigateByUrl('/member/joined-trips');
      },
      error: (error) => {
        this.onFailed(error);
      },
    });
  }
  openChat() {
    this.hideChat = !this.hideChat;
  }
  onCancel() {
    this.location.back();
  }
  private onSuccess(message: string) {
    this.snackBar.open(
      message,
      '',
      { duration: 5000 }
    );
    this.onCancel();
  }
  private onFailed(message: string) {
    this.snackBar.open(
      message,
      'ERROR',
      {
        duration: 100000,
        panelClass: 'error-snackbar',
      }
    );
    this.onCancel();
  }
}
