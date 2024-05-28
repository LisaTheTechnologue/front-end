import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicService } from '../_shared/services/public.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageNotFoundException } from '../_shared/exceptions/page-not-found.exception';
import { Router } from '@angular/router';
import { Contact } from '../_shared/models/contact.model';

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
  isLoading = false;
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private publicService: PublicService
  ) { }
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      subject: [null, [Validators.required]],
      message: [null, [Validators.required]],
    });
  }
  onSubmit() {
    this.isLoading = true;
    // Handle form submission logic (optional)
    // You can display a success message or send an email here
    if (this.contactForm.valid) {
      this.publicService.submitContact(this.contactForm.value as Contact).subscribe(
        (res) => {
          this.onSuccess('Sent successfully')
        },
        // (error) => {
        //   this.onFailed(error);
        // }
    );
    }
  }
  private onSuccess(message: string) {
    this.isLoading = false;
    this.snackBar.open(message, 'OK', { duration: 5000 });
    this.router.navigateByUrl('/');
  }
  private onFailed(message: string) {
    this.snackBar.open(message, 'ERROR', {
      duration: 100000,
      panelClass: 'error-snackbar',
    });
  }
}
