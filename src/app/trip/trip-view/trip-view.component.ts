import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { MemberJoinerService } from '../../_shared/services/member-joiner.service';
import { PageNotFoundException } from 'src/app/_shared/exceptions/page-not-found.exception';
import { Trip, TripMember } from 'src/app/_shared/models/trip.model';
import { PublicService } from 'src/app/_shared/services/public.service';
import { SharedDataService } from 'src/app/_shared/services/shared-data.service';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.css'],
})
export class TripViewComponent implements OnInit {
  isJoined: boolean;
  // isEnded = false;
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  isMemberLoggedIn = false;
  // image: any;
  // trip!: Trip;
  // members!: TripMember[];
  // feedbacks: any[];
  error: any;

  // leaderId: string;
  constructor(
    private publicService: PublicService,
    private activatedRoute: ActivatedRoute,
    private memberJoinerService: MemberJoinerService,
    private snackBar: MatSnackBar,
    private sharedData: SharedDataService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // this.getTrip();
    // this.getMembers();
    this.router.events.subscribe((event) => {
      this.isMemberLoggedIn = StorageService.isMemberLoggedIn();
    });
  }
  getIsJoined($event: boolean) {
    this.isJoined = $event;
    }
  joinTrip() {
    // if (this.isMemberLoggedIn) {
    //   const userId = StorageService.getUserId();
    //   const joiner = {
    //     tripId: this.tripId,
    //     userId: Number(userId),
    //   };

      // this.memberJoinerService.checkJoiner(joiner).subscribe({
        // next: (res) => {
          this.router.navigateByUrl(`/member/payment/create/${this.tripId}`);
        // },
        // error: (error) => {
        //   this.snackBar.open(error, 'ERROR', {
        //     duration: 100000,
        //     panelClass: 'error-snackbar',
        //   });
        // },
    //   });
    // } else {
    //   this.sharedData.setData(this.tripId);
    //   this.router.navigateByUrl('login');
    // }
  }
  // revokeJoinTrip() {
  //   this.memberJoinerService.cancel(this.tripId).subscribe({
  //     next: (res) => {
  //       this.snackBar.open(
  //         'You have revoked of the trip successfully!',
  //         'Close',
  //         {
  //           duration: 5000,
  //         }
  //       );
  //       this.router.navigateByUrl('/member');
  //     },
  //     error: (error) => {
  //       this.snackBar.open(error, 'ERROR', {
  //         duration: 100000,
  //         panelClass: 'error-snackbar',
  //       });
  //     },
  //   });
  // }
}
