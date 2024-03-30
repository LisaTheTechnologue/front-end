import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent {
  trips: any[]=[];
  searchTripForm!:FormGroup;

  constructor(private adminService: AdminService,
    private fb:FormBuilder,
    private snackBar: MatSnackBar){}

  ngOnInit(){
    this.getAllTrips();
    this.searchTripForm = this.fb.group({
      title: [null, [Validators.required]]
    })
  }

  getAllTrips() {
    this.trips = [];
    this.adminService.getAllTrips().subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,'+element.byteImg;
        this.trips.push(element);
      });
      console.log(this.trips);
    })
  }

  submitForm(){
    this.trips = [];
    const title = this.searchTripForm.get('title')!.value;
    this.adminService.getAllTripsByName(title).subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,'+element.byteImg;
        this.trips.push(element);
      });
      console.log(this.trips);
    })
  }

  // delete(tripId:any) {
  //   this.adminService.deleteTrip(tripId).subscribe(res => {
  //     if(res == null){
  //       this.snackBar.open('Trip Deleted Successful!', 'Close', {
  //         duration: 5000,
  //       });
  //       this.getAllTrips();
  //     } else {
  //       this.snackBar.open(res.message, 'ERROR', {
  //         duration: 5000,
  //         panelClass: 'error-snackbar',
  //       });
  //     }
  //   });

  // }
}
