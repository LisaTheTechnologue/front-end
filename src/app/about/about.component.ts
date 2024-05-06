import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicService } from '../_shared/services/public.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageNotFoundException } from '../_shared/exceptions/page-not-found.exception';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  contactForm!: FormGroup;
  aboutUsText = `
  Welcome to your one-stop trip planning companion! We are a team of travel enthusiasts
  dedicated to helping you create unforgettable journeys. We provide a user-friendly platform
  to plan your trips, explore destinations, and discover hidden gems.
`;
  error: any;
  name = '';
  email = '';
  message = '';
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private publicService: PublicService
  ) {}
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      message: [null, [Validators.required]],
    });
  }
  onSubmit() {
    // Handle form submission logic (optional)
    // You can display a success message or send an email here
    const formData: FormData = new FormData();
    formData.append('name', this.contactForm.get('name').value);
    formData.append('email', this.contactForm.get('email').value);
    formData.append('message', this.contactForm.get('message').value);
    this.publicService.submitContact(formData).subscribe({
      next: (res) => {
        this.onSuccess();
      },
      error: (error) => {
        if (error instanceof PageNotFoundException) {
          this.router.navigate(['/page-not-found']);
        } else {
          // Handle other errors here
          this.error = error.message;
        }
      },
    });
  }
  private onSuccess() {
    this.snackBar.open('Sent successfully!', '', { duration: 5000 });
    this.contactForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      message: [null, [Validators.required]],
    });
  }
}
