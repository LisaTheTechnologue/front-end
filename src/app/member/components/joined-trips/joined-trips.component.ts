import { Component } from '@angular/core';
import { AppService } from '../../../_shared/services/app.service';
import { Router } from '@angular/router';
import { MemberTripService } from 'src/app/_shared/services/member-trip.service';

@Component({
  selector: 'app-joined-trips',
  templateUrl: './joined-trips.component.html',
  styleUrls: ['./joined-trips.component.css'],
})
export class JoinedTripsComponent {
  error: any;
  onSearch() {
    throw new Error('Method not implemented.');
  }
  trips: any[] = [];
  // searchTripForm!:FormGroup;
  searchText: string = '';
  constructor(
    private memberTripService: MemberTripService,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllTrips();
    // this.searchTripForm = this.fb.group({
    //   title: [null, [Validators.required]]
    // })
  }

  getAllTrips() {
    this.trips = [];
    this.memberTripService.getAllJoinTrips().subscribe({
      next: (res) => {
        res.forEach((element) => {
          element.imageURL = 'data:image/jpeg;base64,' + element.byteImg;
          this.trips.push(element);
        });
      },
      error: (error) => {
        if (error.status === 404) {
          this.error = "No trips found.";
        }
      },
    });
  }
}
