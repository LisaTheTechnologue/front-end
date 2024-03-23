import { Component } from '@angular/core';
import { User } from '../../../_shared/models/user.model';
import { UserService } from 'src/app/_shared/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  object: User = {
    username: '',
    email: '',
    active: false
  };
  submitted = false;

  constructor(private userService: UserService) {}

  onSubmit(): void {
    const data = {
      username: this.object.username,
      email: this.object.email
    };

    this.userService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  onAdd(): void {
    this.submitted = false;
    this.object = {
      username: '',
      email: '',
      active: false
    };
  }
}
