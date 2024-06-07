import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PublicService } from '../../services/public.service';
import { MemberCommentService } from '../../services/member-comment.service';
import { AdminCommentService } from '../../services/admin-comment.service';
import { ConfirmService } from '../../services/confirm.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() tripId:any;
  isMemberLoggedIn: boolean = StorageService.isMemberLoggedIn();
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();
  isLoggedIn: boolean = false;
  commentForm: FormGroup;
  comments: any;
  userId: any;
  isAdmin: boolean;
  constructor( private fb: FormBuilder,
    private publicService: PublicService,
    private memberCommentService: MemberCommentService,
    private adminCommentService: AdminCommentService,
    private snackBar: MatSnackBar,
    private confirmationService: ConfirmService
  ) {
    this.userId = StorageService.getUserId();
    this.isAdmin = StorageService.isAdminLoggedIn();
    this.isLoggedIn = this.isMemberLoggedIn || this.isAdminLoggedIn;
  }

  ngOnInit() {
    this.initForm();
    this.getComments();  
  }

  private initForm() {
    this.commentForm = this.fb.group({
      message: ['', Validators.required],
      reportFlag: [false],
      tripId: this.tripId
    });
  }

  private getComments() {
    this.publicService.getComments(this.tripId).subscribe(
      (res) => {
        this.comments = res;
      },
      (error) => {
        this.onFailed(error);
      }
    );
  }
  isResolved(item: any) {
    this.confirmationService
      .confirm('Bạn chắc chắn chứ?')
      .subscribe((confirmed) => {
        if (confirmed) {
          if(!this.isAdmin){
          this.memberCommentService.update(item).subscribe(
            (res) => {
              this.getComments(); 
              this.initForm();
            },
          )
        } else {
          this.adminCommentService.update(item).subscribe(
            (res) => {
              this.getComments(); 
              this.initForm();
            },
            // (error) => {
            //   this.onFailed(error);
            // }
          )
        }
      }});
  }
  onSubmit() {
    if(!this.isLoggedIn) {
      this.onFailed("Please login to comment");
      return;
    } 
    if (this.commentForm.valid) {
      if(!this.isAdmin){
        this.memberCommentService.create(this.commentForm.value).subscribe(
          (res) => {
            this.getComments(); 
            this.initForm();
          },
          // (error) => {
          //   this.onFailed(error);
          // }
        )
      } else {
        this.adminCommentService.create(this.commentForm.value).subscribe(
          (res) => {
            this.getComments(); 
            this.initForm();
          },
          // (error) => {
          //   this.onFailed(error);
          // }
        )
      }
      
    }
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
