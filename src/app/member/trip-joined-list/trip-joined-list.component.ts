import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MemberTripService } from 'src/app/_shared/services/member-trip.service';

@Component({
  selector: 'app-trip-joined-list',
  templateUrl: './trip-joined-list.component.html',
  styleUrls: ['./trip-joined-list.component.css']
})
export class TripJoinedListComponent {
  allTrips: any[] = [];

  searchText: string = '';
  startDate?: Date;
  endDate?: Date;
  minPrice?: number;
  error: any;
  tripLevels: Set<string> = new Set<string>([
    'Easy',
    'Moderate',
    'Intermediate',
  ]);
  selectedTripLevels: string[] = [];
  priceMinValue: any;
  priceMaxValue: any;
  trips = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['title', 'time', 'status', 'actions'];

  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  p: number = 1;

  constructor(public memberTripService: MemberTripService,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.memberTripService.getAllJoinTrips().subscribe({
      next: (res) => {
        this.trips.data = res;
        this.allTrips = res;
      },
      error: (error) => {
        if (error.status === 404) {
          this.error = 'No trip found.';
        } else {
          this.error = 'Error! Cannot load list.';
        }
        this.onFailed(this.error);
      },
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
      let tripLevelMatch = true; // Assume all levels are initially matched

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

      const priceMatch = !this.minPrice || item.price >= this.minPrice;

      return searchTextMatch && tripLevelMatch && dateMatch && priceMatch;
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

  extractTripLevels() {
    this.tripLevels.clear();
    this.allTrips.forEach((item) => this.tripLevels.add(item.tripLevel));
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

  private onFailed(message: string) {
    this.snackBar.open(
      message,
      'ERROR',
      {
        duration: 100000,
        panelClass: 'error-snackbar',
      }
    );
  }
}
