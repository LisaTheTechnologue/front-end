import { PageNotFoundException } from 'src/app/_shared/exceptions/page-not-found.exception';
import { Component, Input } from '@angular/core';
import { GroupChat, Message } from 'src/app/_shared/models/chat.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { MemberChatService } from 'src/app/_shared/services/member-chat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/_shared/services/app.service';
import { PublicService } from 'src/app/_shared/services/public.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {

  sending: boolean;
  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  // group: GroupChat | null = null;
  error: string;
  content:string;
  messages: Message[] = [];
  userId = StorageService.getUserId();
  members:any[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: MemberChatService,
    private publicService: PublicService,
    private router: Router) {}

  ngOnInit(): void {
    this.getChat();
    this.publicService.getByTripId(this.tripId).subscribe({
      next: (res) => {
        if (res.joiners.length > 0) {
          this.members = res.joiners;          
        }
      },
  });
    
  }

  getChat(){
    this.messages=[];
    if (this.tripId != null) {
      this.chatService.get(this.tripId).subscribe({
        next: (res) => {
          res.forEach((element) => {
            if (element.userId === this.userId) {
              element.isMe = true;
            }
            this.messages.push(element);
          });

          },
        // error: (error) => {
        //   if (error instanceof PageNotFoundException) {
        //     this.router.navigate(['/page-not-found']);
        //   } else {
        //     // Handle other errors here
        //     this.error = error.message;
        //   }
        // },
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
        this.content=undefined;
        this.sending = false;
      },
      error: () => {
        this.error = 'Something is wrong. Cannot send message.';
      this.sending = false;
       }
  });
  }
}
