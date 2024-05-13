import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { Component } from '@angular/core';
import { MemberJoinerService } from '../../_shared/services/member-joiner.service';
import { PageNotFoundException } from 'src/app/_shared/exceptions/page-not-found.exception';
import { Trip, TripMember } from 'src/app/_shared/models/trip.model';
import { PublicService } from 'src/app/_shared/services/public.service';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.css'],
})
export class TripViewComponent {
  isJoined: boolean;
  isEnded: boolean;
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  isMemberLoggedIn: boolean;
  image: any;
  trip!: Trip;
  members!: TripMember[];
  feedbacks: any[];
  error: any;

  // leaderId: string;
  constructor(
    private publicService: PublicService,
    private activatedRoute: ActivatedRoute,
    private memberJoinerService: MemberJoinerService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit() {
    this.getTrip();
    this.getMembers();
    this.router.events.subscribe((event) => {
      this.isMemberLoggedIn = StorageService.isMemberLoggedIn();
    });
    // this.getFeedbacks();
  }
  getTrip() {
    this.publicService.getByTripId(this.tripId).subscribe({
      next: (res) => {
        this.trip = res;
        this.trip.imageURL = 'data:image/jpeg;base64,' + res.byteImg;
        this.trip.tripDays = res.tripDays;
        if (this.trip.tripStatus == 'END') {
          this.publicService
            .getFeedbacksByTripId(this.tripId)
            .subscribe((res) => (this.feedbacks = res));
          this.isEnded =true;
        } else {
          this.isEnded =false;
        }
      },
      error: (error) => {
        if (error instanceof PageNotFoundException) {
          this.router.navigate(['/page-not-found']);
        } else {
          // Handle other errors here
          this.error = error.message;
        }
      },
    });
  }
  getMembers() {
    this.publicService.getAllJoinerByTripId(this.tripId).subscribe({
      next: (res) => {
        this.members = res;
        // this.trip.members.imageURL = 'data:image/jpeg;base64,' + res.byteImg;
        // this.image = this.trip.imageURL;
        if (this.members.length > 0) {
          if (this.isMemberLoggedIn) {
            const userId = StorageService.getUserId();
            for (var index in res.members) {
              if ((res.members[index].userId = userId)) {
                this.isJoined=true;
                break;
              }
            }
          } else {
            this.isJoined=false;
          }
        }
      },
      error: (error) => {
        if (error instanceof PageNotFoundException) {
          this.router.navigate(['/page-not-found']);
        } else {
          // Handle other errors here
          this.error = error.message;
        }
      },
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
          this.router.navigateByUrl(`/member/payment/create/${this.tripId}`);
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
