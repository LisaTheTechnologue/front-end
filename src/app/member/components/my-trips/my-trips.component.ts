import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MemberTripService } from 'src/app/_shared/services/member-trip.service';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css'],
})
export class MyTripsComponent {
  trips: any[] = [];
  // searchTripForm!:FormGroup;
  searchText: string = '';
  error: any;
  constructor(
    private memberTripService: MemberTripService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllTrips();
    // this.searchTripForm = this.fb.group({
    //   title: [null, [Validators.required]]
    // })
  }

  getAllTrips() {
    this.trips = [];
    this.memberTripService.getAllTrips().subscribe({
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

  onSearch() {}
  deleteTrip(id: number) {
    // this.memberService.delete(id).subscribe((res) => {
    //   this.trips = this.trips.filter((item) => item.id !== id);
    //   console.log('Trip deleted successfully!');
    // });
  }
}
