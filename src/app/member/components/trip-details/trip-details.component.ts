import { Component } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Trip } from 'src/app/_shared/models/trip.model';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent {
joinTrip() {
throw new Error('Method not implemented.');
}
  image: any;
  tripId: number = this.activatedRoute.snapshot.params["tripId"];
  trip!: Trip;
  constructor(private memberService: MemberService,
    private activatedRoute: ActivatedRoute){}
  ngOnInit(){
    this.getTrip();
  }
  getTrip() {
    // this.trip = new Trip();
    this.memberService.getTripById(this.tripId).subscribe(res => {
      console.log(res);
      this.trip = res;
      // this.trip.highlights = res.highlights;
      // this.trip.title = res.title;
      // this.trip.budget = res.budget;
      this.trip.processedImg = 'data:image/jpeg;base64,'+res.byteImg;
      this.image = this.trip.processedImg;
    });

  }
}
