import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from 'src/app/_shared/models/trip.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TripStatusDto } from 'src/app/_shared/models/trip-status.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminTripService } from 'src/app/_shared/services/admin-trip.service';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.css'],
})
export class TripViewComponent {

  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  status: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminTripService: AdminTripService,
  ) {}
  getStatus($event: string) {
    this.status = $event;
    }
  changeStatus(status: string) {
    this.adminTripService.changeStatus(this.tripId,status).subscribe((res) => {
      if (res.id != null) {
        this.snackBar.open('Updated Trip Status Successful!', 'Close', {
          duration: 5000,
        });
        this.router.navigateByUrl('/admin');
      } else {
        this.snackBar.open(res.message, 'ERROR', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      }
    });
  }
}
