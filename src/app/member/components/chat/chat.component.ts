import { PageNotFoundException } from 'src/app/_shared/exceptions/page-not-found.exception';
import { Component, Input } from '@angular/core';
import { GroupChat, Message } from 'src/app/_shared/models/chat.model';
import { Router } from '@angular/router';
import { PublicProfile } from 'src/app/_shared/models/user.model';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { MemberChatService } from 'src/app/_shared/services/member-chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {

  @Input() tripId: number;
  group: GroupChat | null = null;
  error: string;
  usersWithImages: { [userId: number]: PublicProfile } = {};
  chat: any = {
    content: '',
    tripId: -1,
    user: undefined,
  };

  constructor(private chatService: MemberChatService, private router: Router) {}

  ngOnInit(): void {
    this.getChat();
  }

  getChat(){
    if (this.tripId != null) {
      this.chatService.get(this.tripId).subscribe({
        next: (res) => {
          this.processGroupData(res);
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
    this.chatService
      .create({
        content: chat.content,
        postId: chat.postId,
        user: StorageService.getUser()
      })
      .subscribe({ next: () => this.getChat(), error: () => this.error = 'Something is wrong. Cannot send message.' });
  }

  private processGroupData(group: GroupChat): GroupChat {
    group.messages.forEach((message) => {
      message.user.processedImg = this.getAvatarUrl(message.user.byteImg);
    });
    return group;
  }

  private getAvatarUrl(avatar: string): string {
    // Implement logic to construct the avatar URL based on your backend setup
    // (e.g., prepend base URL, handle different avatar storage methods)
    return `data:image/jpeg;base64,${avatar}`;
  }
}
