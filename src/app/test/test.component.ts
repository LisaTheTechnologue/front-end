import { AfterViewInit, Component, OnInit, ViewChild, effect } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Trip } from '../_shared/models/trip.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PublicService } from '../_shared/services/public.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, AfterViewInit {
  titleFilter = new FormControl('');
  idFilter = new FormControl('');
  startDateFilter = new FormControl('');
  endDateFilter = new FormControl('');
  filterValues = {
    title: '',
    id: '',
    startDate: '',
    endDate: ''
  };
  displayedColumns: string[] = ['id', 'title','startDate','endDate'];
  public list_product = new MatTableDataSource<any>([]);
  trips: Trip[] = [];
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public publicService: PublicService) {
  }
  ngOnInit(): void {
    this.publicService.getAllTrips().subscribe(
      res => this.list_product.data = res
    );
    this.titleFilter.valueChanges
      .subscribe(
        title => {
          this.filterValues.title = title;
          this.list_product.filter = JSON.stringify(this.filterValues);
        }
      )
    this.idFilter.valueChanges
      .subscribe(
        id => {
          this.filterValues.id = id;
          this.list_product.filter = JSON.stringify(this.filterValues);
        }
      )
    this.startDateFilter.valueChanges
      .subscribe(
        startDate => {
          this.filterValues.startDate = startDate;
          this.list_product.filter = JSON.stringify(this.filterValues);
        }
      )
    this.endDateFilter.valueChanges
      .subscribe(
        endDate => {
          this.filterValues.endDate = endDate;
          this.list_product.filter = JSON.stringify(this.filterValues);
        }
      )
    }
  ngAfterViewInit() {
    this.list_product.paginator = this.paginator;
    this.list_product.sort = this.sort;
    this.list_product.filterPredicate = this.createFilter();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.list_product.filter = filterValue.trim().toLowerCase();

    if (this.list_product.paginator) {
      this.list_product.paginator.firstPage();
    }
  }
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.title.toLowerCase().indexOf(searchTerms.title) !== -1
        && data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
        && data.startDate.toLowerCase().indexOf(searchTerms.startDate) !== -1
        && data.endDate.toLowerCase().indexOf(searchTerms.endDate) !== -1;
    }
    return filterFunction;
  }
}
