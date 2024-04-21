import { Component, OnInit } from '@angular/core';
import { TripService } from '../../_shared/services/trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Trip } from 'src/app/_shared/models/trip.model';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { MemberService } from '../../member/services/member.service';
import { TripMember } from 'src/app/_shared/models/trip-member.model';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.css'],
})
export class TripViewComponent implements OnInit {
  image: any;
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  trip!: Trip;
  isMemberLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  isJoined: boolean;
  constructor(
    private tripService: TripService,
    private memberService: MemberService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit() {
    this.getTrip();
    this.router.events.subscribe((event) => {
      this.isMemberLoggedIn = StorageService.isMemberLoggedIn();
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    });
  }
  getTrip() {
    // this.trip = new Trip();
    const userId = StorageService.getUserId();
    this.tripService.getById(this.tripId).subscribe((res) => {
      console.log(res);
      this.trip = res;
      // this.trip.highlights = res.highlights;
      // this.trip.title = res.title;
      // this.trip.budget = res.budget;
      this.trip.processedImg = 'data:image/jpeg;base64,' + res.byteImg;
      this.image = this.trip.processedImg;
      for (var index in res.members) {
        if ((res.members[index].userId = userId)) {
          this.isJoined = true;
          break;
        }
      }
    });
  }
  joinTrip() {
    if (this.isMemberLoggedIn) {
      const userId = StorageService.getUserId();
      const tripMember: TripMember = {
        tripId: this.tripId,
        userId: Number(userId),
        userName: '',
      };
      this.memberService.joinTrip(tripMember).subscribe((res) => {
        if (res.id != null) {
          this.snackBar.open('You are on board!', 'Close', {
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
      console.log('joined');
    } else {
      this.router.navigateByUrl('login');
    }
  }

  revokeJoinTrip() {
    if (this.isMemberLoggedIn) {
      this.memberService.revokeJoinTrip(this.tripId).subscribe((res) => {
        if (res.id != null) {
          this.snackBar.open(
            'You have revoked of the trip successfully!',
            'Close',
            {
              duration: 5000,
            }
          );
          this.router.navigateByUrl('/member');
        } else {
          this.snackBar.open(res.message, 'ERROR', {
            duration: 5000,
            panelClass: 'error-snackbar',
          });
        }
      });
    } else {
      this.router.navigateByUrl('login');
    }
  }
}
