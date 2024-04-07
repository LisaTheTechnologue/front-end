import { Component, Input } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from 'src/app/_shared/models/trip.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/_shared/services/app.service';
import { StorageService } from '../../../_shared/services/storage.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css'],
})
export class TripDetailsComponent {
  isJoined: boolean;
  image: any;
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  trip!: Trip;
  constructor(
    private memberService: MemberService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private appService: AppService
  ) {}
  ngOnInit() {
    this.getTrip();
    this.appService.getIsJoined.subscribe(isJoined => this.isJoined = isJoined);
  }
  getTrip() {
    // this.trip = new Trip();
    const userId = StorageService.getUserId();
    this.memberService.getTripById(this.tripId).subscribe((res) => {
      console.log(res);
      this.trip = res;
      this.trip.processedImg = 'data:image/jpeg;base64,' + res.byteImg;
      this.image = this.trip.processedImg;
      for (var index in res.members) {
        if(res.members[index].userId = userId){
          this.isJoined = true;
          break;
        }
      }
    });
  }
  joinTrip() {
    this.memberService.joinTrip(this.tripId).subscribe((res) => {
      if (res.id != null) {
        this.snackBar.open('You have registered to the trip successfully!', 'Close', {
          duration: 5000,
        });
        // this.router.navigateByUrl('/member/my-trips');
      } else {
        this.snackBar.open(res.message, 'ERROR', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      }
    });
  }
  reportTrip() {

  }
}