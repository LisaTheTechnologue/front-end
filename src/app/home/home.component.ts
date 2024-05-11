import { Component, OnInit } from '@angular/core';
import { PublicService } from '../_shared/services/public.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  feedbacks: any[] = [];
  profiles: any[] = [];
  trips: any[] = [];
  constructor(public publicService: PublicService) {}

  ngOnInit(): void {
    this.publicService.getTopUsers().subscribe((res) => {
      res.forEach((element) => {
        element.imageURL = 'data:image/jpeg;base64,' + element.byteImg;
        this.profiles.push(element);
      });
    });
    this.publicService.getLatestTrips().subscribe((res) => {
      res.forEach((element) => {
        element.imageURL = 'data:image/jpeg;base64,' + element.byteImg;
        this.trips.push(element);
      });
    });
    this.publicService.getTopFeedbacks().subscribe((res) => {
      res.forEach((element) => {
        element.imageURL = 'data:image/jpeg;base64,' + element.byteImg;
        this.feedbacks.push(element);
      });
    });
  }
}
