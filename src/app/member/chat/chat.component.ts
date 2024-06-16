import { PageNotFoundException } from 'src/app/_shared/exceptions/page-not-found.exception';
import { Component, Input } from '@angular/core';
import { GroupChat, Message } from 'src/app/_shared/models/chat.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/_shared/services/storage.service';
import { MemberChatService } from 'src/app/_shared/services/member-chat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/_shared/services/app.service';
import { PublicService } from 'src/app/_shared/services/public.service';
import { MemberJoinerService } from 'src/app/_shared/services/member-joiner.service';
import { User } from 'src/app/_shared/models/user.model';

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
  members:User[]= [];
  user!: User;
  rating!:number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: MemberChatService,
    private joinerService: MemberJoinerService,
    private publicService: PublicService,
    private router: Router) {}

  ngOnInit(): void {
    this.getChat();
    this.joinerService.getJoinersByTripId(this.tripId).subscribe({
      next: (res) => {
        res.forEach((element) => {
          element.imageByte = 'data:image/jpeg;base64,' + element.imageByte;
          this.members.push(element);
        });
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
