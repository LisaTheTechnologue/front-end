import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminUserService } from 'src/app/_shared/services/admin-user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users = new MatTableDataSource<any>([]);
  searchText: string = '';
  displayedColumns: string[] = ['username', 'fullName', 'email', 'status', 'actions'];
  constructor(
    private snackBar: MatSnackBar,
    private adminUserService: AdminUserService,
) { }
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {

  }
  ngAfterViewInit() {
    this.users.paginator = this.paginator;
    this.users.sort = this.sort;
  }
  search(){
    this.adminUserService.searchUser(this.searchText).subscribe({
      next: (res) => {
        this.users.data = res;
      },
      // error: (error) => {
      //   this.onFailed(error);
      // },
    })

  }

  private onFailed(message: string) {
    this.snackBar.open(message, 'ERROR', {
      duration: 100000,
      panelClass: 'error-snackbar',
    });
  }
}
