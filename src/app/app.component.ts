import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './_shared/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  year = '2024';
  isMemberLoggedIn : boolean = StorageService.isMemberLoggedIn();
  isAdminLoggedIn : boolean = StorageService.isAdminLoggedIn();

  constructor(private router:Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.isMemberLoggedIn = StorageService.isMemberLoggedIn();
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    })
  }

  logout() {
    StorageService.signOut();
    this.router.navigateByUrl('login');
  }
}
