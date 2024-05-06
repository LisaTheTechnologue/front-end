import { Component, Input } from '@angular/core';
import { Trip } from 'src/app/_shared/models/trip.model';

@Component({
  selector: 'app-trip-short-view',
  templateUrl: './trip-short-view.component.html',
  styleUrls: ['./trip-short-view.component.css']
})
export class TripShortViewComponent {
  @Input() trip: Trip;
}
