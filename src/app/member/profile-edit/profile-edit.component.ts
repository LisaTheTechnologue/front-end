import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Bank, User } from 'src/app/_shared/models/user.model';
import { ConfirmService } from 'src/app/_shared/services/confirm.service';
import { MemberUserService } from 'src/app/_shared/services/member-user.service';
const _moment = moment as any;
interface Gender {
  label: string,
  value: string;
}
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  activeRoute = 'profile';
  profileForm: FormGroup;
  hide = true;
  selectedImage: File | null;
  imagePreview: string | ArrayBuffer | null;
  existingImage: string | null = null;
  isAddMode: boolean;
  imageChanged: boolean = false;
  profile: User;
  error: any;
  maxDob:Date;
  banks: Bank[] = [];
  selectedBank: Bank | null = null;
  genders: Gender[] = [
    { label:"Nữ", value: 'FEMALE' },
    { label:"Nam", value: 'MALE' },
    { label:"Khác", value: 'OTHER' },
  ];
  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private memberUserService: MemberUserService,
  private confirmationService: ConfirmService) { 
    const today = new Date();
  this.maxDob = new Date(
    today.getFullYear() - 15,
    today.getMonth(),
    today.getDate()
  );
  }

  ngOnInit() {
    this.memberUserService.getBanks()
      .subscribe(banks => this.banks = banks);
    const phonePattern = /^\(?([0-9]{3})\)?[. ]?([0-9]{3})[. ]?([0-9]{4})$/;
    this.profileForm = this.fb.group({
      image: ['', Validators.required],
      username: [''], // Set to disabled as mentioned in HTML
      firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      dob: [null, [Validators.required]],
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
        const [day, month, year] = res.dob.split('-');
        let dob: Date = new Date(+year, +month - 1, +day);
        this.profileForm.controls['dob'].setValue(dob);
        const selectedGender = this.genders.find(gender => gender.value === res.gender);
        if (selectedGender) {
          this.profileForm.controls['gender'].setValue(selectedGender);
        }
        const selectedBank = this.banks.find(bank => bank.shortName.toLowerCase() == res.paymentAccBankShortName.toLowerCase());
        if (selectedBank) {
          this.profileForm.controls['paymentAccBank'].setValue(selectedBank);
        }
        if(res.imageByte){
          this.existingImage = res.imageByte;
          this.profileForm.get('image')?.setValue(this.existingImage);
        }
      },
      // error: (error) => {
      //   this.onFailed(error);
      // },
    })
    this.profileForm.controls['username'].disable();
  }

  minTenYearsOldValidator(control: FormControl): { [key: string]: boolean } | null {
    if (control.value) {
      const today = new Date();
      const tenYearsAgo = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());
      if (control.value < tenYearsAgo) {
        return { minTenYearsOld: true }; // Return an error object if invalid
      }
    }
    return null; // Return null if valid
  }

  onDateChange(event: MatDatepickerInputEvent<any>) {
    this.profileForm.get('dob').setValue(event.value);
  }

  onSelectedImage(event: File| null) {
    this.selectedImage = event;
    this.imageChanged = true;
    this.profileForm.get('image')?.setValue(this.selectedImage);
  }
  // bankShortName: any;
  // bankName: any;
  // setSelectedBank(bank: Bank) {
  //   // Use the bank object here, access both name and shortName
  //   this.bankShortName = bank.shortName;
  //   this.bankName = bank.name;
  // }

  submit(): void {
    // if (this.tripForm.valid) {
    this.confirmationService
      .confirm('Bạn chắc chắn muốn làm điều này?')
      .subscribe((confirmed) => {
        if (confirmed) {
          const formData = new FormData();
          // formData.append('username', this.profileForm.get('username').value);
          formData.append('firstName', this.profileForm.get('firstName').value);
          formData.append('lastName', this.profileForm.get('lastName').value);
          var dobStr = new Date(moment(this.profileForm.get('dob').value).format('YYYY-MM-DD')).toISOString();
          formData.append('dob', dobStr);
          formData.append('phoneNo', this.profileForm.get('phoneNo').value);
          formData.append('gender', this.profileForm.get('gender').value.value);
          formData.append('email', this.profileForm.get('email').value); 
          formData.append('paymentAccNo', this.profileForm.get('paymentAccNo').value);
          formData.append('paymentAccName', this.profileForm.get('paymentAccName').value);
          formData.append('paymentAccBank', this.profileForm.get('paymentAccBank').value.name);
          formData.append('paymentAccBankShortName', this.profileForm.get('paymentAccBank').value.shortName);
          if (this.selectedImage) {
            formData.append('image', this.profileForm.get('image').value);
          } 

          this.memberUserService
            .updateProfile(formData)
            .subscribe({
              next: (res) => {
                // if (this.imageChanged) {
                //   const formData: FormData = new FormData();
                //   formData.append('file', this.selectedImage);
                //   // console.log(formData.get('file'));
                //   this.memberUserService
                //     .uploadImage(formData)
                //     .subscribe({
                //       next: (res) => {
                        this.onSuccess('Cập nhật thông tin thành công!');
                      // },
                      // error: (error) => {
                      //   console.log(error);
                      //   this.error += error;
                      // },
                    // });
                // } else {
                //   this.onSuccess('Updated Profile Successfully');
                // }
              },
              // error: (error) => {
              //   this.onFailed(error);
              // },
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
    this.snackBar.open(message, 'X', {
      duration: 10000,
      panelClass: 'error-snackbar',
    });
  }
}
