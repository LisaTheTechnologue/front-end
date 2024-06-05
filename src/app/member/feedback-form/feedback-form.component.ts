import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FormUtilsService } from 'src/app/_shared/services/form-utils.service';
import { MemberFeedbackService } from 'src/app/_shared/services/member-feedback.service';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { Location } from '@angular/common';
export interface FeedbackDTO {
  id?: any;
  tripId:number;
  feedback: string;
  tripRating: number;
  leaderRating: number;
}

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm!: FormGroup;
  error: any;
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  // ratings: number[] = [];
  tripRating = 0;
  leaderRating = 0;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private memberFeedbackService: MemberFeedbackService,
    private location: Location,
    private formUtils: FormUtilsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      leaderRating: [null, [Validators.required]],
      tripRating: [null, [Validators.required]],
      feedback: [null, [Validators.required]],
    });
    this.getFeedbackById();
  }
  getFeedbackById() {
    // this.trip = new Trip();
    // const userId = StorageService.getUserId();
    this.memberFeedbackService.get(this.tripId).subscribe((res) => {
      this.feedbackForm.patchValue({
        leaderRating: res.leaderRating,
        tripRating: res.tripRating,
        feedback: res.feedback
      });
    });
  }

  submit(): void {
    // if (this.tripForm.valid) {
    const userId = StorageService.getUserId();
    let dto: FeedbackDTO = {
      id: Number(userId),
      tripId: this.feedbackForm.get('tripId')?.value,
      leaderRating:this.feedbackForm.get('leaderRating').value,
      tripRating: this.feedbackForm.get('tripRating')?.value,
      feedback: this.feedbackForm.get('feedback')?.value,
    }

    this.memberFeedbackService.submit(dto).subscribe({
      next: (res) => {
        this.onSuccess();
      },
      // error: (error) => {
      //   this.onFailed( error.message);
      // },
    });
  }

  getErrorMessage(fieldName: string): string {
    return this.formUtils.getFieldErrorMessage(this.feedbackForm, fieldName);
  }

  onCancel() {
    this.location.back();
  }
  private onSuccess() {
    this.snackBar.open('Feedback saved successfully!', '', { duration: 5000 });
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
