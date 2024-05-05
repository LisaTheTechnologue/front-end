import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  aboutUsText = `
  Welcome to your one-stop trip planning companion! We are a team of travel enthusiasts
  dedicated to helping you create unforgettable journeys. We provide a user-friendly platform
  to plan your trips, explore destinations, and discover hidden gems.
`;

  name = '';
  email = '';
  message = '';

  onSubmit() {
    // Handle form submission logic (optional)
    // You can display a success message or send an email here
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
