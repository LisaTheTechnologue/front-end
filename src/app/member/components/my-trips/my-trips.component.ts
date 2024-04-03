import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MemberService } from '../../services/member.service';
import { Trip } from 'src/app/_shared/models/trip.model';

@Component({
  selector: 'app-dasboard',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent {
  trips: any[]=[];
  // searchTripForm!:FormGroup;
  searchText: string = '';
  constructor(private memberService: MemberService,
    private fb:FormBuilder,
    private snackBar: MatSnackBar){}

  ngOnInit(){
    this.getAllTrips();
    // this.searchTripForm = this.fb.group({
    //   title: [null, [Validators.required]]
    // })
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

  // submitForm(){
  //   this.trips = [];
  //   const title = this.searchTripForm.get('title')!.value;
  //   this.memberService.getAllTripsByName(title).subscribe(res => {
  //     res.forEach(element => {
  //       element.processedImg = 'data:image/jpeg;base64,'+element.byteImg;
  //       this.trips.push(element);
  //     });
  //     console.log(this.trips);
  //   })
  // }
  onSearch() {
    // this.text = searchInput() this.form.value.searchText;
    // if (this.searchText.trim()) {
      this.memberService
        .search(this.searchText)
        .subscribe((data: Trip[]) => {
          this.trips = data;
          console.log(this.trips);
        });
  }
  deleteTrip(id: number) {
    this.memberService.delete(id).subscribe((res) => {
      this.trips = this.trips.filter((item) => item.id !== id);
      console.log('Trip deleted successfully!');
    });
  }
}
