import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Trip } from 'src/app/_shared/models/trip.model';
import { MemberService } from '../../services/member.service';
import { AppService } from '../../../_shared/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-joined-trips',
  templateUrl: './joined-trips.component.html',
  styleUrls: ['./joined-trips.component.css']
})
export class JoinedTripsComponent {
onSearch() {
throw new Error('Method not implemented.');
}
  trips: any[]=[];
  // searchTripForm!:FormGroup;
  searchText: string = '';
  constructor(
    private memberService: MemberService,
    private appService: AppService,
  private router: Router){}

  ngOnInit(){
    this.getAllTrips();
    // this.searchTripForm = this.fb.group({
    //   title: [null, [Validators.required]]
    // })
  }

  getAllTrips() {
    this.trips = [];
    this.memberService.getAllJoinTrips().subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,'+element.byteImg;
        this.trips.push(element);
      });
      console.log(this.trips);
    })
  }
}
