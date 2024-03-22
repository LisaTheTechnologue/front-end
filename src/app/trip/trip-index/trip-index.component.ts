import { Component } from '@angular/core';
import { Trip } from '../_models/trip';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-trip-index',
  templateUrl: './trip-index.component.html',
  styleUrls: ['./trip-index.component.css']
})
export class TripIndexComponent {
  trips: Trip[] = [];

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public tripService: TripService) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.tripService.getAll().subscribe((data: Trip[])=>{
      this.trips = data;
      console.log(this.trips);
    })
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  deleteTrip(id:number){
    this.tripService.delete(id).subscribe(res => {
         this.trips = this.trips.filter(item => item.id !== id);
         console.log('Trip deleted successfully!');
    })
  }
}
