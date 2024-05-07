import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Trip } from 'src/app/_shared/models/trip.model';
import { MemberService } from '../../../_shared/services/member.service';
import { AppService } from '../../../_shared/services/app.service';
import { Router } from '@angular/router';
import { PageNotFoundException } from 'src/app/_shared/exceptions/page-not-found.exception';

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
    private memberService: MemberService,
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
    this.memberService.getAllTripsByParticipantId().subscribe({
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
