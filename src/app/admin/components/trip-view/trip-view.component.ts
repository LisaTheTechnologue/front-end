import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from 'src/app/_shared/models/trip.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TripStatusDto } from 'src/app/_shared/models/trip-status.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.css'],
})
export class TripViewComponent {
  image: any;
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  trip!: Trip;
  approved: boolean = false;
  form!:FormGroup;
  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.form = this.fb.group({
      reason: [''],
    });
    this.getTrip();
  }
  getTrip() {
    // this.trip = new Trip();
    this.adminService.getTripById(this.tripId).subscribe((res) => {
      console.log(res);
      this.trip = res;
      // this.trip.highlights = res.highlights;
      // this.trip.title = res.title;
      // this.trip.price = res.price;
      this.approved = res.tripStatus == 'apprroved'  ? true : false;
      this.trip.imageURL = 'data:image/jpeg;base64,' + res.byteImg;
      this.image = this.trip.imageURL;
    });
  }
  changeStatus(status: string) {
    const tripStatusChange: TripStatusDto = {
      tripId: this.tripId,
      tripStatus: status,
      reason: this.form.get('reason')!.value
    };
    console.log(tripStatusChange);
    this.adminService.changeStatus(tripStatusChange).subscribe((res) => {
      if (res.id != null) {
        this.snackBar.open('Product Posted Successful!', 'Close', {
          duration: 5000,
        });
        this.router.navigateByUrl('/admin/dashboard');
      } else {
        this.snackBar.open(res.message, 'ERROR', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      }
    });
  }
}
