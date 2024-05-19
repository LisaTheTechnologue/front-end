import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../_shared/services/auth.service';
import { StorageService } from '../_shared/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  loginForm!: FormGroup;
  // hidePassword = true;
  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  // togglePasswordVisibility() {
  //   this.hidePassword = !this.hidePassword;
  // }

  onSubmit(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.login(username, password).subscribe(
      (res) => {
        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('admin');
        } else if (StorageService.isMemberLoggedIn()) {
          this.router.navigateByUrl('member');
        }
      },
      (error) => {
        this.onFailed(error);
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
