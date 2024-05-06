import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Trip, TripMember } from 'src/app/_shared/models/trip.model';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { MemberService } from '../../_shared/services/member.service';
import { PublicService } from 'src/app/_shared/services/public.service';
import { Component } from '@angular/core';
import { PageNotFoundException } from 'src/app/_shared/exceptions/page-not-found.exception';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.css'],
})
export class TripViewComponent {

  image: any;
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  trip!: Trip;
  isMemberLoggedIn: boolean;
  isJoined: boolean = false;
  error: any;

  // leaderId: string;
  constructor(
    private publicService: PublicService,
    private memberService: MemberService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit() {
    this.getTrip();
    this.router.events.subscribe((event) => {
      this.isMemberLoggedIn = StorageService.isMemberLoggedIn();
    });
  }
  getTrip() {
    this.publicService.getByTripId(this.tripId).subscribe({
      next: (res) => {
        this.trip = res;
        this.trip.processedImg = 'data:image/jpeg;base64,' + res.byteImg;
        this.trip.tripDays = res.tripDays;
        this.image = this.trip.processedImg;
        // for (var index in res.members) {
        //   if ((res.members[index].userId = userId)) {
        //     this.isJoined = true;
        //     break;
        //   }
        // }
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

    this.publicService.getAllJoinerByTripId(this.tripId).subscribe({
      next: (res) => {
        this.trip.members = res;
        // this.trip.members.processedImg = 'data:image/jpeg;base64,' + res.byteImg;
        // this.image = this.trip.processedImg;
        if (this.trip.members.length > 0) {
          if (this.isMemberLoggedIn) {
            const userId = StorageService.getUserId();
            for (var index in res.members) {
              if ((res.members[index].userId = userId)) {
                this.isJoined = true;
                break;
              }
            }
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
      this.memberService.createJoinTrip(joiner).subscribe((res) => {
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
}
