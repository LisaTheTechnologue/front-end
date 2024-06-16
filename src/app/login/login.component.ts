import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_shared/services/auth.service';
import { StorageService } from '../_shared/services/storage.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedDataService } from '../_shared/services/shared-data.service';

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
    private route: ActivatedRoute,
    private sharedData: SharedDataService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  onSubmit(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.login(username, password).subscribe(
      (res) => {
        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('admin');
        } else if (StorageService.isMemberLoggedIn()) {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/member';
          this.router.navigate([returnUrl]);
        }
      }
    )
  }
  private onFailed(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 10000,
      panelClass: 'error-snackbar',
    });
  }
}
