import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminContactService } from 'src/app/_shared/services/admin-contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  error: any;

  public contacts = new MatTableDataSource<any>([]);
  filteredData: any[] = [];
  displayedColumns: string[] = ['subject', 'createdDate', 'createdBy', 'status', 'actions'];

  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private adminContactService: AdminContactService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.adminContactService.getAll().subscribe((res) => {
      this.contacts.data = res;
    });
  }

  ngAfterViewInit() {
    this.contacts.paginator = this.paginator;
    this.contacts.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.contacts.filter = filterValue.trim().toLowerCase();

    if (this.contacts.paginator) {
      this.contacts.paginator.firstPage();
    }
  }
  private onFailed(message: string) {
    this.snackBar.open(message, 'ERROR', {
      duration: 100000,
      panelClass: 'error-snackbar',
    });
  }
}
