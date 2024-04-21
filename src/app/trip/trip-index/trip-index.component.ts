import { Component, Input } from '@angular/core';
import { TripService } from '../../_shared/services/trip.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-trip-index',
  templateUrl: './trip-index.component.html',
  styleUrls: ['./trip-index.component.css'],
})
export class TripIndexComponent {
  trips: any[] = [];
  searchText: string = '';
  // searchTripForm!: FormGroup;
  filteredData: any[] = [];
  tripLevels: Set<string> = new Set<string>(["Easy", "Moderate","Intermediate"]);
  selectedTripLevels: string[] = [];
  startDate: any = "";
  endDate: any = "";
  priceMinValue: any;
  priceMaxValue: any;

  p: number = 1;

  constructor(public tripService: TripService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.tripService.getAll().subscribe((res) => {
      res.forEach((element) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.trips.push(element);
      });
      console.log(this.trips);
    });
    this.filteredData = this.trips;
  }


filterData() {
    this.filteredData = this.trips.filter(item => {
      const searchTextMatch = item.title.toLowerCase().includes(this.searchText.toLowerCase());
      let tripLevelMatch = true; // Assume all categories are initially matched

      // Filter by checkboxes (if any are selected)
      if (this.selectedTripLevels.length > 0) {
        tripLevelMatch = this.selectedTripLevels.some(tripLevel => item.tripLevel === tripLevel);
      }

      // Filter by date range (optional)
      const dateMatch = !this.startDate || !this.endDate ||
                       (item.fromDate >= this.startDate && item.fromDate <= this.endDate);

      // Filter by price (optional)
      // this.minPrice = value;
      const priceMatch = !this.minPrice || item.budget >= this.minPrice;

      return searchTextMatch && tripLevelMatch && dateMatch && priceMatch;
    });
  }
  fromDate?: Date;
  toDate?: Date;

  onFromDateChange(value: Date) {
    this.fromDate = value;
    this.filterData();
  }

  onToDateChange(value: Date) {
    this.toDate = value;
    this.filterData();
  }

  extractTripLevels() {
    this.tripLevels.clear();
    this.trips.forEach(item => this.tripLevels.add(item.tripLevel));
  }

  onTripLevelChange(tripLevel: string, event: Event) {
    const isChecked = (<HTMLInputElement>event.target).checked;
    if (isChecked) {
      this.selectedTripLevels.push(tripLevel);
    } else {
      const index = this.selectedTripLevels.indexOf(tripLevel);
      if (index > -1) {
        this.selectedTripLevels.splice(index, 1);
      }
    }
    this.filterData();
  }

  minPrice?: number;
}
