import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../_shared/services/auth.service';
import { FormUtilsService } from '../_shared/services/form-utils.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm!: FormGroup;
  hidePassword = true;
  hideCPassword = true;
  constructor( private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
  private formUtils: FormUtilsService){

    }

  ngOnInit(): void{
    this.signupForm = this.fb.group({
      lastName: [null, [Validators.required, Validators.minLength(1),Validators.maxLength(50)]],
      firstName: [null, [Validators.required, Validators.minLength(1),Validators.maxLength(50)]],
      username: [null, [Validators.required, Validators.minLength(1),Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(4),Validators.maxLength(50)]],
      password: [null, [Validators.required, Validators.minLength(8),Validators.maxLength(120)]],
      confirmPassword: [null, [Validators.required]],
    })
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  toggleCPasswordVisibility(){
    this.hideCPassword = !this.hideCPassword;
  }
  getErrorMessage(fieldName: string): string {
    return this.formUtils.getFieldErrorMessage(this.signupForm, fieldName);
  }
  onSubmit():void {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if(password !== confirmPassword){
      this.onFailed('Mật khẩu không khớp.');
      return;
    }

    this.authService.register(this.signupForm.value).subscribe(
      (res) => {
        this.onSuccess('Đăng ký thành công!');
      },
      // (error) => {
      //   this.onFailed(error);
      // }
    )

  }
  private onSuccess(message: string) {
    this.snackBar.open(message, 'OK', { duration: 5000 });
    this.router.navigateByUrl('/login');
  }
  private onFailed(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 10000,
      panelClass: 'error-snackbar',
    });
  }
}
