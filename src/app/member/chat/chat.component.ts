import { PageNotFoundException } from 'src/app/_shared/exceptions/page-not-found.exception';
import { Component, Input } from '@angular/core';
import { GroupChat, Message } from 'src/app/_shared/models/chat.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicProfile } from 'src/app/_shared/models/user.model';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { MemberChatService } from 'src/app/_shared/services/member-chat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/_shared/services/app.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  // chatForm!: FormGroup;
  sending: boolean;
  // @Input() tripId: number;
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  group: GroupChat | null = null;
  error: string;
  content:string;
  // usersWithImages: { [userId: number]: PublicProfile } = {};
  // chat: any = {
  //   content: '',
  //   tripId: -1,
  //   user: undefined,
  // };

  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: MemberChatService,
    private router: Router) {}

  ngOnInit(): void {
    this.getChat();
  }

  getChat(){
    const userId = StorageService.getUserId();
    if (this.tripId != null) {
      this.chatService.get(this.tripId).subscribe({
        next: (res) => {
          // this.processGroupData(res);
          if (res.userId === userId) {
            res.isMe = true;
          }
          this.group.messages.push(res);
        },
        error: (error) => {
          if (error instanceof PageNotFoundException) {
            this.router.navigate(['/page-not-found']);
          } else {
            // Handle other errors here
            this.error = error.message;
          }
        },
      });
    }
  }

  postComment(chat: any) {
    this.sending = true;
    this.chatService
      .create({
        content: this.content,
        tripId: this.tripId,
        userId: StorageService.getUserId()
      })
      .subscribe({
        next: () => {
        this.getChat();
        this.sending = false;
      },
      error: () => {
        this.error = 'Something is wrong. Cannot send message.';
      this.sending = false;
       }
  });
  }
}
