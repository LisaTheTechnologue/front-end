import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MemberTripService } from 'src/app/_shared/services/member-trip.service';

@Component({
  selector: 'app-trip-created-list',
  templateUrl: './trip-created-list.component.html',
  styleUrls: ['./trip-created-list.component.css']
})
export class TripCreatedListComponent {
  error: any;

  public trips = new MatTableDataSource<any>([]);
  filteredData: any[] = [];
  displayedColumns: string[] = ['title', 'time', 'status', 'actions'];

  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private memberTripService: MemberTripService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.memberTripService.getAllTrips().subscribe({
      next: (res) => {
        this.trips.data = res;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.trips.filter = filterValue.trim().toLowerCase();

    if (this.trips.paginator) {
      this.trips.paginator.firstPage();
    }
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
  // trips: any[] = [];
  // // searchTripForm!:FormGroup;
  // searchText: string = '';
  // error: any;
  // constructor(
  //   private memberTripService: MemberTripService,
  //   private router: Router,
  //   private fb: FormBuilder,
  //   private snackBar: MatSnackBar
  // ) {}

  // ngOnInit() {
  //   this.getAllTrips();
  //   // this.searchTripForm = this.fb.group({
  //   //   title: [null, [Validators.required]]
  //   // })
  // }

  // getAllTrips() {
  //   this.trips = [];
  //   this.memberTripService.getAllTrips().subscribe({
  //     next: (res) => {
  //       res.forEach((element) => {
  //         element.imageURL = 'data:image/jpeg;base64,' + element.byteImg;
  //         this.trips.push(element);
  //       });
  //     },
  //     error: (error) => {
  //       if (error.status === 404) {
  //         this.error = "No trips found.";
  //       }
  //     },
  //   });
  // }

  // onSearch() {}
  deleteTrip(id: number) {
    // this.memberTripService.delete(id).subscribe((res) => {
    //   this.trips = this.trips.filter((item) => item.id !== id);
    //   console.log('Trip deleted successfully!');
    // });
  }
}