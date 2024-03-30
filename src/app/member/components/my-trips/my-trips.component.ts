import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent {
  trips: any[]=[];
  searchTripForm!:FormGroup;

  constructor(private memberService: MemberService,
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
    this.memberService.getAllTrips().subscribe(res => {
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
    this.memberService.getAllTripsByName(title).subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,'+element.byteImg;
        this.trips.push(element);
      });
      console.log(this.trips);
    })
  }

  // delete(tripId:any) {
  //   this.memberService.deleteTrip(tripId).subscribe(res => {
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
