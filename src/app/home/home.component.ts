import { Component, OnInit } from '@angular/core';
import { PublicService } from '../_shared/services/public.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  feedbacks: any[] = [];
  profiles: any[] = [];
  trips: any[] = [];
  currentSlideIndex = 0;

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

  prevSlide() {
    this.currentSlideIndex--;
  }

  nextSlide() {
    this.currentSlideIndex++;

    // Handle reaching the end of the carousel (optional)
    if (this.currentSlideIndex === this.feedbacks.length) {
      this.currentSlideIndex = 0;
    }
  }
}
