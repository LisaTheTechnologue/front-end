import { Component, OnInit } from '@angular/core';
import { PublicService } from '../_shared/services/public.service';
import { Feedback, Trip } from '../_shared/models/trip.model';
import { User } from '../_shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  feedbacks: Feedback[] = [];
  profiles: User[] = [];
  trips: Trip[] = [];

  constructor(public publicService: PublicService) {}

  ngOnInit(): void {
    this.publicService.getTopUsers().subscribe((res) => {
      res.forEach((element) => {
        element.imageByte = 'data:image/jpeg;base64,' + element.imageByte;
        this.profiles.push(element);
      });
    });
    this.publicService.getLatestTrips().subscribe((res) => {
      this.trips = res;
    });
    this.publicService.getTopFeedbacks().subscribe((res) => {
      this.feedbacks = res;
    });

  }

}
