import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { TripLevel } from 'src/app/_shared/models/enum.model';
import { PublicService } from 'src/app/_shared/services/public.service';
const _moment = moment as any;
@Component({
  selector: 'app-trip-index',
  templateUrl: './trip-index.component.html',
  styleUrls: ['./trip-index.component.css'],
})
export class TripIndexComponent {
  trips: any[] = [];
  searchText: string = '';
  cities: any[] = [];
  maxPrice?: number;
  selectedCityId: number;
  // searchTripForm!: FormGroup;
  filteredData: any[] = [];
  tripLevels = TripLevel;
  //  Set<string> = new Set<string>([
  //   'Easy',
  //   'Moderate',
  //   'Intermediate',
  // ]);
  selectedTripLevels: string[] = [];
  // startDate: any = "";
  // endDate: any = "";
  priceMinValue: any;
  priceMaxValue: any;

  p: number = 1;

  constructor(public publicService: PublicService, 
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.publicService.getAllTrips().subscribe((res) => {
      res.forEach((element) => {
        // element.imageURL = 'data:image/jpeg;base64,' + element.imageByte;
        this.trips.push(element);
      });
    });
    this.filteredData = this.trips;
    this.getAllCities();
  }

  getAllCities() {
    this.publicService.getAllCities().subscribe({
      next: (res) => {
        this.cities = res;
      },
      // error: (error) => {
      //   this.onFailed(error);
      // },
    });
  }

  startDate?: Date;
  endDate?: Date;
  filterData() {
    this.filteredData = this.trips.filter((item) => {
      const searchTextMatch = item.title
        .toLowerCase()
        .includes(this.searchText.toLowerCase());

      let cityMatch = true;
      if(this.selectedCityId !== undefined && this.selectedCityId != 999) {
        cityMatch = item.cityId == this.selectedCityId;
      }
          
      let tripLevelMatch = true; // Assume all categories are initially matched

      // Filter by checkboxes (if any are selected)
      if (this.selectedTripLevels.length > 0) {
        tripLevelMatch = this.selectedTripLevels.some(
          (tripLevel) => item.tripLevel === tripLevel
        );
      }
      // const [day1, month1, year1] = item.startDate.split('-');
      // let startDateStr = year1+"-"+month1+"-"+day1;
      // // let startDate: Date = new Date(+year1, +month1 - 1, +day1);
      // const [day, month, year] = item.endDate.split('-');
      // let endDateStr = year+"-"+month+"-"+day;
      let startDate:Date = _moment(item.startDate,"DD-MM-YYYY").format("YYYY-MM-DD");
      let endDate:Date = _moment(item.endDate,"DD-MM-YYYY").format("YYYY-MM-DD");
      // Filter by date range (optional)
      const dateMatch =
        (!this.startDate && !this.endDate) ||
        (!this.endDate && startDate >= this.startDate) ||
        (!this.startDate && endDate <= this.endDate) ||
        (startDate >= this.startDate && endDate <= this.endDate);

      // Filter by price (optional)
      // this.minPrice = value;
      const priceMatch = !this.maxPrice || item.price <= this.maxPrice;

      return searchTextMatch 
      && cityMatch 
      && tripLevelMatch && dateMatch && priceMatch;
    });
  }

  // onstartDateChange(value: Date) {
  //   this.startDate = value;
  //   this.filterData();
  // }

  // onendDateChange(value: Date) {
  //   this.endDate = value;
  //   this.filterData();
  // }

  // extractTripLevels() {
    // this.tripLevels.clear();
    // this.trips.forEach((item) => this.tripLevels.add(item.tripLevel));
  // }

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

  private onFailed(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 10000,
      panelClass: 'error-snackbar',
    });
  }
}
