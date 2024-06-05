import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PublicService } from '../../services/public.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {
  @Input() userId: number;
  @Output() outputUser = new EventEmitter<any>();
  user!: User;
  rating!:number;
  constructor(
    private publicService: PublicService
  ) {}

  ngOnInit() {
  //   console.log(this.leader);
    this.publicService.getByUserId(this.userId).subscribe(
      (profile) => {
        this.user = profile;
        if(profile.imageByte != null ) {
          this.user.imageByte = 'data:image/jpeg;base64,' + profile.imageByte;
        }
        this.rating = this.user.rating;
        this.outputUser.emit(this.user);
      }
    );
  }
}
