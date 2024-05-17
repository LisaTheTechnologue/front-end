import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PageNotFoundException } from '../../exceptions/page-not-found.exception';
import { Trip, TripMember } from '../../models/trip.model';
import { PublicService } from '../../services/public.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css'],
})
export class TripDetailsComponent {
  @Input({ required: true }) tripId: number;

  image: any;
  // tripId: number = this.activatedRoute.snapshot.params['tripId'];
  userId:any;
  trip!: Trip;
  members!: TripMember[];
  feedbacks: any[];
  isMemberLoggedIn: boolean;
  @Output() status = new EventEmitter<string>();
  @Output() isJoined = new EventEmitter<boolean>();
  @Output() isEnded = new EventEmitter<boolean>();
  @Output() isLeader = new EventEmitter<boolean>();
  error: any;

  // leaderId: string;
  constructor(
    private publicService: PublicService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.getTrip();
    this.getMembers();
    this.router.events.subscribe((event) => {
      this.isMemberLoggedIn = StorageService.isMemberLoggedIn();
    });
    this.userId = StorageService.getUserId();
  }
  getTrip() {
    this.publicService.getByTripId(this.tripId).subscribe({
      next: (res) => {
        this.trip = res;
        this.trip.imageURL = 'data:image/jpeg;base64,' + res.byteImg;
        this.trip.tripDays = res.tripDays;
        if(this.trip.leaderId == this.userId){
          this.isLeader.emit(true);
        }
        this.status.emit(this.trip.tripStatus);
        if (this.trip.tripStatus == 'END') {
          this.publicService
            .getFeedbacksByTripId(this.tripId)
            .subscribe((res) => (this.feedbacks = res));
          this.isEnded.emit(true);
        } else {
          this.isEnded.emit(false);
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
        if (this.members.length > 0) {
          if (this.isMemberLoggedIn) {
            for (var index in res) {
              if ((res[index].userId === this.userId)) {
                this.isJoined.emit(true);
                break;
              }
            }
          } else {
            this.isJoined.emit(false);
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
}
