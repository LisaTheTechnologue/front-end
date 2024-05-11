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
      this.memberJoinerService.createJoin(joiner).subscribe((res) => {
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
