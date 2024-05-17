import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import PasswordValidation from 'src/app/_shared/passsword-validations';
import { MemberUserService } from 'src/app/_shared/services/member-user.service';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.css'],
})
export class PasswordEditComponent implements OnInit {
  passwordForm: FormGroup;
  error: any;
  constructor(
    private fb: FormBuilder,
    private memberUserService: MemberUserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [PasswordValidation.match('password', 'confirmPassword')],
      }
    );
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      return;
    }

    const passwordChangeData: any = {
      oldPassword: this.passwordForm.get('oldPassword').value,
      newPassword: this.passwordForm.get('newPassword').value,
    };

    this.memberUserService.updatePassword(passwordChangeData).subscribe({
      next: (res) => {
        this.onSuccess('Updated Password Successfully');
      },
      error: (error) => {
        this.onFailed(error);
      },
    });
  }
  private onSuccess(message: string) {
    this.snackBar.open(message, 'OK', { duration: 5000 });
    this.router.navigateByUrl('/member');
  }
  private onFailed(message: string) {
    this.snackBar.open(message, 'ERROR', {
      duration: 100000,
      panelClass: 'error-snackbar',
    });
  }
}
