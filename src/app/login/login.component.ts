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
  loginForm!: FormGroup;
  hidePassword = true;
  constructor( private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router){

    }

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit():void {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.login(email,password).subscribe(
      (res) => {
        if(StorageService.isAdminLoggedIn()){
          this.router.navigateByUrl('admin/dashboard');
        } else if(StorageService.isMemberLoggedIn()){
          this.router.navigateByUrl('member/dashboard');
        }
      },
      (error) => {
        this.snackBar.open('Bad credentials.', 'Close', {duration:5000});
      }
    )

  }
}
