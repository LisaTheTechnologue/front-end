import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../_shared/services/auth.service';
import { StorageService } from '../_shared/services/storage.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  loginForm!: FormGroup;
  isLoading = false;
  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  onSubmit(): void {
    this.isLoading = true;
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.login(username, password).subscribe(
      (res) => {
        this.isLoading = false; 
        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('admin');
        } else if (StorageService.isMemberLoggedIn()) {
          this.router.navigateByUrl('member');
        }
      },
      (error) => {
        this.onFailed(error);
        this.isLoading = false; 
      }
    )
  }
  private onFailed(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 100000,
      panelClass: 'error-snackbar',
    });
  }
}
