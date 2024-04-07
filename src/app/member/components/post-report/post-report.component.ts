import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  leaderName: string;
  tripTitle: string;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private memberService: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }
  ngOnInit(): void {
    this.memberService.getTripById(this.tripId).subscribe((res) => {
      if (res.id != null) {
       this.leaderName = res.leaderName;
       this.tripTitle = res.tripTitle;
      }});
    this.reportForm = this.fb.group({
      subject: [null, [Validators.required]],
      reason: [null, [Validators.required]],
    });
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
  submit(status: string): void {
    // if (this.tripForm.valid) {
    const formData: FormData = new FormData();
    const userId = StorageService.getUserId();
    formData.append('img', this.selectedFile);
    formData.append('subject', this.reportForm.get('subject').value);
    formData.append('reason', this.reportForm.get('reason').value);
    formData.append('tripId', this.reportForm.get('tripId').value);
    formData.append('leaderId', this.reportForm.get('leaderId').value);
    formData.append('userId', userId);
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
