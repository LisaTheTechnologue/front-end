import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/_shared/models/user.model';
import { ConfirmService } from 'src/app/_shared/services/confirm.service';
import { MemberUserService } from 'src/app/_shared/services/member-user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;
  hide = true;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  existingImage: string | null = null;
  isAddMode: boolean;
  imageChanged: boolean = false;
  profile: User;
  error: any;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private memberUserService: MemberUserService,
  private confirmationService: ConfirmService) { }

  ngOnInit() {
    const phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    this.profileForm = this.fb.group({
      username: [''], // Set to disabled as mentioned in HTML
      firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      dob: [null],
      phoneNo: ['',[Validators.pattern(phonePattern)]],
      gender: [''],
      email: ['', [Validators.required, Validators.email]],
      paymentAccNo: [''],
      paymentAccName: [''],
      paymentAccBank: [''],
    });
    this.memberUserService.getProfile().subscribe({
      next: (res) => {
        this.profile = res;
        this.profileForm.patchValue(this.profile);
        if(res.byteImg){
          this.existingImage = 'data:image/jpeg;base64,' + res.byteImg;
        }
      },
      error: (error) => {
        this.onFailed(error);
      },
    })
    this.profileForm.controls['username'].disable();
  }

  onDateChange(event: MatDatepickerInputEvent<any>) {
    this.profileForm.get('dob').setValue(event.value);
  }

  selectedImage(event: File) {
    this.selectedFile = event;
    this.imageChanged = true;
  }

  submit(): void {
    // if (this.tripForm.valid) {
    this.confirmationService
      .confirm('Are you sure you want to submit this?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.memberUserService
            .updateProfile(this.profileForm.value as User)
            .subscribe({
              next: (res) => {
                if (this.imageChanged) {
                  const formData: FormData = new FormData();
                  formData.append('file', this.selectedFile);
                  // console.log(formData.get('file'));
                  this.memberUserService
                    .uploadImage(formData)
                    .subscribe({
                      next: (res) => {
                        this.onSuccess('Updated Profile Successfully');
                      },
                      error: (error) => {
                        console.log(error);
                        this.error += error;
                      },
                    });
                } else {
                  this.onSuccess('Updated Profile Successfully');
                }
              },
              error: (error) => {
                this.onFailed(error);
              },
            });
        } else {
          // Handle cancellation
        }
      });

  }

  private onSuccess(message: string) {
    this.snackBar.open(message, 'OK', { duration: 5000 });
  }
  private onFailed(message: string) {
    this.snackBar.open(message, 'ERROR', {
      duration: 100000,
      panelClass: 'error-snackbar',
    });
  }
}
