import { Component, Input } from '@angular/core';
import { Trip } from 'src/app/_shared/models/trip.model';
import { User } from 'src/app/_shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from 'src/app/_shared/components/error-dialog/error-dialog.component';
import { Location } from '@angular/common';
import { MemberUserService } from 'src/app/_shared/services/member-user.service';
import { UserService } from '../../_shared/services/user.service';
import { MemberPaymentService } from 'src/app/_shared/services/member-payment.service';
import { MemberTripService } from 'src/app/_shared/services/member-trip.service';
import { PublicService } from 'src/app/_shared/services/public.service';
import { ConfirmDialogComponent } from 'src/app/_shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmService } from 'src/app/_shared/services/confirm.service';
import { FormUtilsService } from 'src/app/_shared/services/form-utils.service';
@Component({
  selector: 'app-trip-payment',
  templateUrl: './trip-payment.component.html',
  styleUrls: ['./trip-payment.component.css'],
})
export class TripPaymentComponent {
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  trip!: Trip;
  user!: User;
  qrUrl: string;
  qrCodeData: Blob | null = null;
  rating!:number;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  paymentForm!: FormGroup;
  isLoading = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private publicService: PublicService,
    private confirmationService: ConfirmService,
    private paymentService: MemberPaymentService,
    private userService: MemberUserService,
    private location: Location,
    private dialog: MatDialog,
    private fb: FormBuilder,
    public formUtils: FormUtilsService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getTrip();
    this.paymentForm = this.fb.group({
      id:[null, []],
      amount: [null, [Validators.required]],
      members: this.fb.array([]),
      notes: [null, []],
    });
  }
  formatNumber(event: Event) {
    const data = (event.target as HTMLInputElement).value;
    const parts = data.split('.');
    const formattedPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedPart + (parts.length > 1 ? '.' + parts[1] : '');
  }
  getTrip(){
    this.publicService.getByTripId(this.tripId).subscribe({
      next: (res) => {
        this.trip = res;
        // this.getProfile(this.trip.leaderId);
        // this.trip.imageByte = 'data:image/jpeg;base64,' + res.imageByte;
      },
      // error: (error) => {
      //   this.onFailed(error);
      // },
    });
  }
  getUser(event:User) {
    this.user = event;
    this.qrUrl = "https://img.vietqr.io/image/"+this.user.paymentAccBankShortName + "-" + 
                      this.user.paymentAccName + "-compact2.jpg" //?amount=" + this.trip.price + "&addInfo=test";
                      + "?addInfo='Chuyển khoản cho chuyến đi'"

  }
  // getProfile(userId:number) {
  //   this.publicService.getByUserId(userId)
  //   .subscribe((res) => {      
  //     this.user = res;
  //     if(res.imageByte != null ) {
  //       this.user.imageByte = 'data:image/jpeg;base64,' + res.imageByte;
  //     }
  //     this.qrUrl = "https://img.vietqr.io/image/"+this.user.paymentAccBankShortName + "-" + 
  //                       this.user.paymentAccName + "-compact2.jpg" //?amount=" + this.trip.price + "&addInfo=test";
  //                       + "?addInfo='Chuyển khoản cho chuyến đi'"
  //     this.rating = res.rating;
  //   });
  // }

  selectedImage(event: File) {
    this.selectedFile = event;
    // this.imageChanged = true;
  }

  members(): FormArray {
    return this.paymentForm.get('members') as FormArray;
  }

  newMember(): FormGroup {
    const phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return this.fb.group({
      id: 0,
      fullName: [null, [Validators.required]],
      dob: [null, [Validators.required]],
      phoneNo: ['',[Validators.pattern(phonePattern)]],
      gender: [''],
    });
  }

  addMember() {
    // const tripDays = this.tripForm.get('tripDays') as UntypedFormArray;
    this.members().push(this.newMember());
  }

  removeMember(memberIndex: number) {
    this.members().removeAt(memberIndex);
  }
  getMemberErrorMessage(fieldName: string, index: number) {
    return this.formUtils.getFieldFormArrayErrorMessage(
      this.paymentForm,
      'tripDays',
      fieldName,
      index
    );
  }
  submit() {
    this.isLoading = true;
    if(this.selectedFile!=null) {
      this.confirmationService
      .confirm('Bạn chắc chắn muốn làm điều này?')
      .subscribe((confirmed) => {
        if (confirmed) {
            const formData: FormData = new FormData();
            formData.append('img', this.selectedFile);
            formData.append('tripId', this.tripId+'');
            formData.append('amount', this.paymentForm.get('amount').value);
            formData.append('notes', this.paymentForm.get('notes').value);
            const members = this.paymentForm.get('members').value;
            formData.append('membersJson', JSON.stringify(members));
            this.paymentService.create(formData).subscribe({
              next: (res) => {
                // const formData: FormData = new FormData();
                // formData.append('img', this.selectedFile);
                // formData.append('id',res.id);
                // this.paymentForm.setValue({
                //   id:res.id,
                  
                // });
                // this.paymentService.createMember(this.paymentForm)
                // .subscribe({
                //   next: (res) => {
                    this.isLoading = false;
                    this.onSuccess("Payment sent successfully! Please wait for the leader's approval");
                //   },
                //   error: (error) => {
                //     this.isLoading = false;
                //     this.onFailed(error.message);
                //   },
                // })
              },
              
            });        
          } else {
            // Handle cancellation
          }}
        );
    } else {
      this.onFailed("Image is required.");
    }
  }

  onCancel() {
    this.location.back();
  }
  private onSuccess(message: string) {
    this.snackBar.open(
      message,
      'OK',
      { duration: 5000 }
    );
    this.onCancel();
  }
  private onFailed(message: string) {
    this.snackBar.open(
      message,
      'ERROR',
      {
        duration: 5000,
        panelClass: 'error-snackbar',
      }
    );
  }
}
