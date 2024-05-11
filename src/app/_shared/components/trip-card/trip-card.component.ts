import { Component, Input } from '@angular/core';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() trip: Trip;
  ngOnInit(): void {
    this.trip.imageURL = 'data:image/jpeg;base64,' + this.trip.byteImg;
  }
}
