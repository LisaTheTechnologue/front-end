import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from 'src/app/_shared/models/trip.model';
import { User } from 'src/app/_shared/models/user.model';
import { MemberUserService } from 'src/app/_shared/services/member-user.service';
import { MemberTripService } from 'src/app/_shared/services/member-trip.service';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css'],
})
export class MemberProfileComponent {
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
    private profileService: MemberUserService,
    private route: ActivatedRoute,
    private tripService: MemberTripService
  ) {}

  async ngOnInit(): Promise<void> {


    this.getUser();
  }

  async getUser(): Promise<void> {
    // if (this.route.snapshot.paramMap.get('email') != null) {
    //   const email = this.route.snapshot.paramMap.get('email');
    //   if (email) {
    //     // Set user
    //     this.profileService
    //       .getProfile(email)
    //       .subscribe((user) => (this.user = user));
    //     // Set trips
    //     this.memberService
    //       .getAllTrips()
    //       .subscribe((trips) => (this.trips = trips));

    //   }
    // } else {
      this.profileService.getProfile().subscribe((user) => {
        this.user = user;
        if(user.byteImg != undefined) {
          this.user.imageURL = 'data:image/jpeg;base64,' + user.byteImg;
        }
        // this.tripService
        //   .getAllTrips()
        //   .subscribe((trips) => (this.trips = trips));
        this.selfProfileCheck = true;
      });
    // }
  }


}