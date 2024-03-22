import { Component } from '@angular/core';
import { TripParticipantsService } from '../../_shared/services/trip-participants.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TripParticipants } from '../_models/trip-participants';

@Component({
  selector: 'app-trip-participants',
  templateUrl: './trip-participants.component.html',
  styleUrls: ['./trip-participants.component.css'],
})
export class TripParticipantsComponent {
  id = 0;
  message = '';
  participants?: TripParticipants[];

  constructor(
    private tripParticipantsService: TripParticipantsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['tripId'];
    this.tripParticipantsService.getById(this.id).subscribe((data) => {
      this.participants = data;
      console.log(this.participants);
    });
  }
  select(event: any): void {

  }
  add(): void{

  }
}
