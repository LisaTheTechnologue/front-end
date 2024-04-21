import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from 'src/app/_shared/models/comment.model';
import { CommentService } from 'src/app/_shared/services/comment.service';
import { ProfileService } from 'src/app/_shared/services/profile.service';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.css']
})
export class CommentViewComponent {
  user = {
    profilePictureUrl: '',
    fullname: '',
  };

  @Input() comment: Comment | null = null;
  @Input() currentUserEmail!: string;

  @Output() delete = new EventEmitter<Comment>();

  constructor(
    private commentService: CommentService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    if (this.commentAndUserExist(this.comment)) {
      this.profileService.getProfile(this.comment?.userEmail ?? '').subscribe(
        (prof) => {
          this.user.profilePictureUrl = prof.profilepicurl ?? '';
          this.user.fullname = prof.fname + ' ' + prof.lname;
        }
      );
    }
  }

  deleteComment(comment: Comment): void {
    console.log(comment);
    if (comment && comment.id !== undefined) {
      this.commentService.delete(comment.id);
      this.delete.emit(comment);
    }
  }

  commentAndUserExist(comment: Comment | null): boolean {
    if (comment && comment.userEmail) {
      return true;
    }
    return false;
  }
}
