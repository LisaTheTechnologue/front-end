import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from '../_shared/models/trip.model';
import { PublicProfile, User } from '../_shared/models/user.model';
import { PublicService } from '../_shared/services/public.service';

@Component({
  selector: 'app-profile-public',
  templateUrl: './profile-public.component.html',
  styleUrls: ['./profile-public.component.css'],
})
export class ProfilePublicComponent {
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

  constructor(
    private publicService: PublicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    if (this.route.snapshot.params['member'] == null) {
      // Set user
      this.publicService
        .getProfile(this.leaderId)
        .subscribe((user) => (this.user = user));
      // Set trips
      this.publicService
        .getTripsByLeaderId(this.leaderId)
        .subscribe((trips) => (this.trips = trips));
    } else {
      this.selfProfileCheck = true;
    }
  }

  display(trip: Trip) {
    this.selectedTrip = trip;
  }

  displaySelectedTrip(trip: Trip) {
    return this.selectedTrip === trip;
  }
}
