import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PageNotFoundException } from 'src/app/_shared/exceptions/page-not-found.exception';
import { MemberFeedbackService } from 'src/app/_shared/services/member-feedback.service';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.css'],
})
export class FeedbackCreateComponent {
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
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      leaderRating: [null, [Validators.required]],
      tripRating: [null, [Validators.required]],
      feedback: [null, [Validators.required]],
    });
  }

  submit(): void {
    // if (this.tripForm.valid) {
    const formData: FormData = new FormData();
    const userId = StorageService.getUserId();
    formData.append('leaderRating', this.leaderRating + '');
    formData.append('tripRating', this.tripRating + '');
    formData.append('feedback', this.feedbackForm.get('feedback').value);
    formData.append('userId', userId);
    formData.append('tripId', this.tripId + '');
    this.memberFeedbackService.create(formData).subscribe({
      next: (res) => {
        this.onSuccess();
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }
  onCancel() {
    this.location.back();
  }
  private onSuccess() {
    this.snackBar.open('Trip saved successfully!', '', { duration: 5000 });
    this.onCancel();
  }
}
