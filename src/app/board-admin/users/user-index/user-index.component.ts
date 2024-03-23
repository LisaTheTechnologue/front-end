import { Component } from '@angular/core';
import { User } from 'src/app/_shared/models/user.model';
import { UserService } from 'src/app/_shared/services/user.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent {
  objects?: User[];
  currentUser: User = {};
  currentIndex = -1;
  title = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.objects = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = {};
    this.currentIndex = -1;
  }

  setActiveUser(tutorial: User, index: number): void {
    this.currentUser = tutorial;
    this.currentIndex = index;
  }

  removeAllUsers(): void {
    this.userService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  searchTitle(): void {
    this.currentUser = {};
    this.currentIndex = -1;

    this.userService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.objects = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}
