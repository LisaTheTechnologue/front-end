import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import PasswordValidation from 'src/app/_shared/passsword-validations';
import { FormUtilsService } from 'src/app/_shared/services/form-utils.service';
import { MemberUserService } from 'src/app/_shared/services/member-user.service';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.css'],
})
export class PasswordEditComponent implements OnInit {
  passwordForm: FormGroup;
  error: any;
  hideNPassword = true;
  hideCPassword = true;
  hideOPassword = true;
  constructor(
    private fb: FormBuilder,
    private memberUserService: MemberUserService,
    private snackBar: MatSnackBar,
    private formUtils:FormUtilsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(120)]],
        confirmPassword: ['', [Validators.required]],
      }
    );
  }
  getErrorMessage(fieldName: string): string {
    return this.formUtils.getFieldErrorMessage(this.passwordForm, fieldName);
  }
  onSubmit() {
    const newPassword = this.passwordForm.get('newPassword')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;

    if(newPassword !== confirmPassword){
      this.snackBar.open('Passwords do not match.', 'Close', {duration: 5000, panelClass: 'error-snackbar'});
      return;
    }

    const passwordChangeData: any = {
      oldPassword: this.passwordForm.get('oldPassword').value,
      newPassword: this.passwordForm.get('newPassword').value,
    };

    this.memberUserService.changePassword(passwordChangeData).subscribe({
      next: (res) => {
        this.onSuccess('Updated Password Successfully');
      },
      // error: (error) => {
      //   this.onFailed(error);
      // },
    });
  }
  private onSuccess(message: string) {
    this.snackBar.open(message, 'OK', { duration: 5000 });
    this.router.navigateByUrl('/member');
  }
  private onFailed(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 10000,
      panelClass: 'error-snackbar',
    });
  }
}
