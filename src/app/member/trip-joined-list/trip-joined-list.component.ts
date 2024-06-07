import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TripLevel } from 'src/app/_shared/models/enum.model';
import { Trip } from 'src/app/_shared/models/trip.model';
import { MemberTripService } from 'src/app/_shared/services/member-trip.service';
import { PublicService } from 'src/app/_shared/services/public.service';

@Component({
  selector: 'app-trip-joined-list',
  templateUrl: './trip-joined-list.component.html',
  styleUrls: ['./trip-joined-list.component.css']
})
export class TripJoinedListComponent {
  allTrips: Trip[] = [];
  activeRoute = 'joined-trips';
  searchText: string = '';
  startDate?: Date;
  endDate?: Date;
  cities: any[] = [];
  maxPrice?: number;
  selectedCityId: number;
  error: any;
  tripLevels = TripLevel;
  //  Set<string> = new Set<string>([
  //   'Easy',
  //   'Moderate',
  //   'Intermediate',
  // ]);
  selectedTripLevels: string[] = [];
  priceMinValue: any;
  priceMaxValue: any;
  trips = new MatTableDataSource<Trip>([]);
  displayedColumns: string[] = ['title', 'time', 'status', 'actions'];

  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  p: number = 1;

  constructor(public memberTripService: MemberTripService,
    private snackBar: MatSnackBar,
  private publicService: PublicService) {}

  ngOnInit(): void {
    this.memberTripService.getAllJoinTrips().subscribe((res) => {
      this.trips.data = res;
      this.allTrips = res;
    });
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
  ngAfterViewInit() {
    this.trips.paginator = this.paginator;
    this.trips.sort = this.sort;
  }
  filterData() {
    this.trips.data = this.allTrips.filter((item) => {
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

      // Filter by date range (optional)
      const dateMatch =
        (!this.startDate && !this.endDate) ||
        (!this.endDate && item.startDate >= this.startDate) ||
        (!this.startDate && item.endDate <= this.endDate) ||
        (item.startDate >= this.startDate && item.endDate <= this.endDate);

      // Filter by price (optional)
      // this.minPrice = value;
      const priceMatch = !this.maxPrice || item.price <= this.maxPrice;

      return searchTextMatch 
      && cityMatch 
      && tripLevelMatch && dateMatch && priceMatch;
    });
  }
  onstartDateChange(value: Date) {
    this.startDate = value;
    this.filterData();
  }

  onendDateChange(value: Date) {
    this.endDate = value;
    this.filterData();
  }

  // extractTripLevels() {
  //   this.tripLevels.clear();
  //   this.allTrips.forEach((item) => this.tripLevels.add(item.tripLevel));
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
    this.snackBar.open(
      message,
      'X',
      {
        duration: 10000,
        panelClass: 'error-snackbar',
      }
    );
  }
}
