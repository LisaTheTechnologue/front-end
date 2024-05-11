import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip, Feedback } from '../_shared/models/trip.model';
import { PublicProfile } from '../_shared/models/user.model';
import { PublicService } from '../_shared/services/public.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageNotFoundException } from '../_shared/exceptions/page-not-found.exception';
import { StorageService } from '../_shared/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  leaderId: number = this.route.snapshot.params['userId'];
  // User whose profile page you are on
  user: PublicProfile | undefined;
  // User logged in
  selfUser!: PublicProfile;
  // Person logged in email
  currentUserEmail = '';
  trips: Trip[] | undefined;
  selfProfileCheck = false;
  selectedTrip: Trip;
  feedbacks: Feedback[];
  error: any;
  constructor(
    private publicService: PublicService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUser();
  }
  getFeedbacksByTripId(tripId: number) {
    this.publicService.getFeedbacksByTripId(tripId).subscribe((res) => (this.feedbacks = res));
  }

  getUser() {
    // if (this.route.snapshot.params['member'] == null) {
      // Set user
      this.publicService
        .getProfile(this.leaderId)
        .subscribe({
          next: (res) => {
            this.user = res;
            this.user.imageURL = 'data:image/jpeg;base64,' + res.byteImg;
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
}
