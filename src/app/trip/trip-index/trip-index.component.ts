import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PublicService } from 'src/app/_shared/services/public.service';

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
  tripLevels: Set<string> = new Set<string>([
    'Easy',
    'Moderate',
    'Intermediate',
  ]);
  selectedTripLevels: string[] = [];
  // startDate: any = "";
  // endDate: any = "";
  priceMinValue: any;
  priceMaxValue: any;

  p: number = 1;

  constructor(public publicService: PublicService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.publicService.getAllTrips().subscribe((res) => {
      res.forEach((element) => {
        element.imageURL = 'data:image/jpeg;base64,' + element.byteImg;
        this.trips.push(element);
      });
    });
    this.filteredData = this.trips;
  }

  filterData() {
    this.filteredData = this.trips.filter((item) => {
      const searchTextMatch = item.title
        .toLowerCase()
        .includes(this.searchText.toLowerCase());
      let tripLevelMatch = true; // Assume all categories are initially matched

      // Filter by checkboxes (if any are selected)
      if (this.selectedTripLevels.length > 0) {
        tripLevelMatch = this.selectedTripLevels.some(
          (tripLevel) => item.tripLevel === tripLevel
        );
      }

      // Filter by date range (optional)
      const dateMatch =
        !this.startDate ||
        !this.endDate ||
        (item.startDate >= this.startDate && item.startDate <= this.endDate);

      // Filter by price (optional)
      // this.minPrice = value;
      const priceMatch = !this.minPrice || item.price >= this.minPrice;

      return searchTextMatch && tripLevelMatch && dateMatch && priceMatch;
    });
  }
  startDate?: Date;
  endDate?: Date;

  onstartDateChange(value: Date) {
    this.startDate = value;
    this.filterData();
  }

  onendDateChange(value: Date) {
    this.endDate = value;
    this.filterData();
  }

  extractTripLevels() {
    this.tripLevels.clear();
    this.trips.forEach((item) => this.tripLevels.add(item.tripLevel));
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
