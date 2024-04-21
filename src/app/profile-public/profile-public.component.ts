import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from '../_shared/models/trip.model';
import { User } from '../_shared/models/user.model';
import { ProfileService } from '../_shared/services/profile.service';
import { PublicService } from '../_shared/services/public.service';

@Component({
  selector: 'app-profile-public',
  templateUrl: './profile-public.component.html',
  styleUrls: ['./profile-public.component.css'],
})
export class ProfilePublicComponent {
  leaderId: number = this.route.snapshot.params['userId'];
  // User whose profile page you are on
  user: User | undefined;
  // User logged in
  selfUser!: User;
  // Person logged in email
  currentUserEmail = '';
  trips: Trip[] | undefined;
  followStatus = false;
  selfProfileCheck = false;

  constructor(
    private publicService: PublicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    // Set user
    this.publicService
      .getProfile(this.leaderId)
      .subscribe((user) => (this.user = user));
    // Set trips
    this.publicService
      .getTripsByLeaderId(this.leaderId)
      .subscribe((trips) => (this.trips = trips));
  }
}
