import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MemberPaymentService } from 'src/app/_shared/services/member-payment.service';

@Component({
  selector: 'app-payment-history-list',
  templateUrl: './payment-history-list.component.html',
  styleUrls: ['./payment-history-list.component.css']
})
export class PaymentHistoryListComponent implements OnInit {
  error: any;
  activeRoute = 'payment-list';
  public joins= new MatTableDataSource<any>([]);
  searchText: string = '';
  filteredData: any[] = [];
  displayedColumns: string[] = ['title','createdDate','status','actions'];

  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private memberPaymentService: MemberPaymentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.memberPaymentService.getByPayerId().subscribe((res) => {
      this.joins.data = res;
    });

    }
  ngAfterViewInit() {
    this.joins.paginator = this.paginator;
    this.joins.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.joins.filter = filterValue.trim().toLowerCase();

    if (this.joins.paginator) {
      this.joins.paginator.firstPage();
    }
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
