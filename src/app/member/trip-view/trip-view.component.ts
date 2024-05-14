import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.css']
})
export class TripViewComponent {
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  isJoined: boolean;
  isEnded: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}


}
