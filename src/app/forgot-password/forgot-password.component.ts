import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../_shared/services/user.service';
import { PublicService } from '../_shared/services/public.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  forgotPasswordForm: FormGroup;
  errorMessage: string = '';
  isLoading = false;
  constructor(private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private publicService: PublicService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      this.publicService.sendTemporaryPassword(email)
        .subscribe(
          (response: { message: string }) => {
            this.snackBar.open(response.message, 'Close', {
              duration: 10000,
              panelClass: 'error-snackbar',
            });
            this.isLoading = false; 
          },
          (error) => {
            this.errorMessage = error.error;
            this.isLoading = false; 
          }
        );
    }
  }
}
