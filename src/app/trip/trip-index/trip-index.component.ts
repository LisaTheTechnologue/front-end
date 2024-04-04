import { Component } from '@angular/core';
import { TripService } from '../services/trip.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Trip } from 'src/app/_shared/models/trip.model';

@Component({
  selector: 'app-trip-index',
  templateUrl: './trip-index.component.html',
  styleUrls: ['./trip-index.component.css'],
})
export class TripIndexComponent {
  trips: any[] = [];
  searchText: string = '';
  searchTripForm!: FormGroup;
  // form = this.fb.group({
  //   searchText: [''],
  // });

  // searchResults: Product[] = [];

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public tripService: TripService, private fb: FormBuilder) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.searchTripForm = this.fb.group({
      searchText: [''],
    });
    this.tripService.getAll().subscribe((res) => {
      res.forEach((element) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.trips.push(element);
      });
      console.log(this.trips);
    });
  }
  // get searchInput(): String {
  //   return this.form.get('searchText') === null ? '': this.form.get('searchText')?.value;
  // }
  onSearch() {
    // this.text = searchInput() this.form.value.searchText;
    // if (this.searchText.trim()) {
    this.tripService.search(this.searchText).subscribe((res) => {
      res.forEach((element) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.trips.push(element);
      });
      console.log(this.trips);
    });
    // } else {
    //   this.trips = []; // Clear results if search text is empty
    // }
  }
  submitForm() {
    // this.trips = [];
    const title = this.searchTripForm.get('title')!.value;
    this.tripService.search(this.searchText).subscribe((res) => {
      res.forEach((element) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.trips.push(element);
      });
      console.log(this.trips);
    });
  }
}
