import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MemberJoinerService } from 'src/app/_shared/services/member-joiner.service';

@Component({
  selector: 'app-join-request-list',
  templateUrl: './join-request-list.component.html',
  styleUrls: ['./join-request-list.component.css']
})
export class JoinRequestListComponent implements OnInit, AfterViewInit{
  error: any;

  public joins= new MatTableDataSource<any>([]);
  searchText: string = '';
  filteredData: any[] = [];
  displayedColumns: string[] = ['title','createdDate','status','actions'];

  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private memberJoinerService: MemberJoinerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.memberJoinerService.getAllPendingByLeaderId().subscribe({
      next: (res) => {
        this.joins.data = res;
      },
      error: (error) => {
        if (error.status === 404) {
          this.error = "No requests found.";
        } else {
          this.error = "Error! Cannot load list.";
        }
        this.onFailed(this.error);
      },
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
      'ERROR',
      {
        duration: 100000,
        panelClass: 'error-snackbar',
      }
    );
  }
}
