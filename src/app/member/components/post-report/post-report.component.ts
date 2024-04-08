import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-post-report',
  templateUrl: './post-report.component.html',
  styleUrls: ['./post-report.component.css']
})
export class PostReportComponent {
  reportForm!: FormGroup;
  listOfCities: any = [];
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  today = new Date();
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  leaderId:string;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private memberService: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }
  ngOnInit(): void {
    this.reportForm = this.fb.group({
      subject: [null, [Validators.required]],
      reason: [null, [Validators.required]],
      leaderName: new FormControl({ value: '', disabled: true }),
      tripTitle: new FormControl({ value: '', disabled: true })
    });
    this.memberService.getTripById(this.tripId).subscribe((res) => {
      if (res.id != null) {
        this.leaderId = res.leaderId ;
        this.reportForm.controls['leaderName'].setValue(res.leaderName);
        this.reportForm.controls['tripTitle'].setValue(res.title);
      }});
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }
  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
  submit(): void {
    // if (this.tripForm.valid) {
    const formData: FormData = new FormData();
    const userId = StorageService.getUserId();
    formData.append('img', this.selectedFile);
    formData.append('subject', this.reportForm.get('subject').value);
    formData.append('reason', this.reportForm.get('reason').value);
    formData.append('tripId', this.tripId + "");
    formData.append('leaderId', this.leaderId);
    formData.append('createdByUserId', userId);
    this.memberService.reportTrip(formData).subscribe((res) => {
      if (res.id != null) {
        this.snackBar.open('Product Posted Successful!', 'Close', {
          duration: 5000,
        });
        this.router.navigateByUrl('/member/my-trips');
      } else {
        this.snackBar.open(res.message, 'ERROR', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      }
    });
    // } else {
    //   for (const i in this.tripForm.controls) {
    //     this.tripForm.controls[i].markAsDirty();
    //     this.tripForm.controls[i].updateValueAndValidity();
    //   }
    // }
  }
}
