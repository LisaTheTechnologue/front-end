import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { Component } from '@angular/core';
import { MemberJoinerService } from '../../_shared/services/member-joiner.service';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.css'],
})
export class TripViewComponent {

  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  isMemberLoggedIn: boolean;
  isJoined: boolean = false;

  // leaderId: string;
  constructor(
    private memberJoinerService: MemberJoinerService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.isMemberLoggedIn = StorageService.isMemberLoggedIn();
    });
  }

  joinTrip() {
    if (this.isMemberLoggedIn) {
      const userId = StorageService.getUserId();
      const joiner =  {
        tripId: this.tripId,
        userId: Number(userId),
      };

      this.memberJoinerService.checkJoiner(joiner).subscribe({
        next: (res) => {
          this.router.navigateByUrl(`/member/payment/${this.tripId}`);
        },
        error: (error) => {
          this.snackBar.open(error, 'ERROR', {
            duration: 100000,
            panelClass: 'error-snackbar',
          });
        },
      });
    } else {
      this.router.navigateByUrl('login');
    }
  }
  revokeJoinTrip() {
    this.memberJoinerService.cancel(this.tripId).subscribe({
      next: (res) => {
        this.snackBar.open(
          'You have revoked of the trip successfully!',
          'Close',
          {
            duration: 5000,
          }
        );
        this.router.navigateByUrl('/member');
      },
      error: (error) => {
        this.snackBar.open(error, 'ERROR', {
          duration: 100000,
          panelClass: 'error-snackbar',
        });
      },
    });
  }
}
