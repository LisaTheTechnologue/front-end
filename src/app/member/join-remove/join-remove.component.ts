import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MemberJoinerService } from 'src/app/_shared/services/member-joiner.service';
import { MemberTripService } from 'src/app/_shared/services/member-trip.service';
import { PublicService } from 'src/app/_shared/services/public.service';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmService } from 'src/app/_shared/services/confirm.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-join-remove',
  templateUrl: './join-remove.component.html',
  styleUrls: ['./join-remove.component.css']
})
export class JoinRemoveComponent implements OnInit {
  members: any[] = [];
  joiners: any[] = [];
  error: string;
  removeForm!: FormGroup;
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  constructor(
    private publicService: PublicService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private location: Location,
    private confirmationService: ConfirmService,
    private activatedRoute: ActivatedRoute,
    private memberJoinerService: MemberJoinerService
  ) { }

  ngOnInit() {
    this.removeForm = this.fb.group({
      // img: [null, [Validators.required]],
      member: [null, [Validators.required]],
    });
    this.publicService.getAllJoinerByTripId(this.tripId).subscribe({
      next: (res) => {
        this.joiners = res;
        res.forEach((element) => {
          this.publicService.getByUserId(element.userId).subscribe({
            next: (member) => {
              this.members.push(member);
            },
            error: (error) => {
              this.onFailed(error.error);
            },
          });
        });
      },
      error: (error) => {
        this.onFailed("The member list is empty.");
      },
    });
  }

  remove() {
    this.confirmationService
      .confirm('Are you sure you want to submit this?')
      .subscribe((confirmed) => {
        if (confirmed) {
          const userId = this.removeForm.get('member')?.value;
          let joinerId: number;
          this.joiners.forEach((element) => {
            if (element.userId === userId) {
              joinerId = element.id;
            }
          })
          this.memberJoinerService.remove(joinerId)
            .subscribe(
              (response: { message: string }) => {
                this.onSuccess(response.message);
              },
              (error) => {
                this.onFailed(error.error);
              }
            );
        } else {

        }
      })
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
