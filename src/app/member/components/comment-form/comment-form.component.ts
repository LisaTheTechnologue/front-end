import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/_shared/components/error-dialog/error-dialog.component';
import { CommentFormData } from 'src/app/_shared/models/comment-form-data';
import { CommentService } from 'src/app/_shared/services/comment.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {
  @Input() postId!: number;
  @Input() parentCommentId!: number;
  email = '';

  comment: CommentFormData = {
    content: '',
    postId: -1,
    parentCommentId: undefined,
  };

  @Output() notifyComment: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private location: Location,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setPostID(this.postId);
  }

  setPostID(id: number): void {
    this.comment.postId = id;
  }

  postComment(comment: CommentFormData): void {
    this.commentService
      .create({
        content: comment.content,
        postId: comment.postId,
      })
      .subscribe({ next: () => this.onSuccess(), error: () => this.onError() });
  }
  onCancel() {
    this.location.back();
  }
  private onSuccess() {
    this.snackBar.open('Course saved successfully!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.dialog.open(ErrorDialogComponent, {
      data: 'Error saving course.',
    });
  }
}
