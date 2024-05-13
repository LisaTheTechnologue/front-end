import { AfterViewInit, Component, OnInit, ViewChild, effect } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Trip } from '../_shared/models/trip.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PublicService } from '../_shared/services/public.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'title'];
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
    }
  ngAfterViewInit() {
    this.list_product.paginator = this.paginator;
    this.list_product.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.list_product.filter = filterValue.trim().toLowerCase();

    if (this.list_product.paginator) {
      this.list_product.paginator.firstPage();
    }
  }
}
