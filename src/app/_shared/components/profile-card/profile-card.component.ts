import { Component, Input } from '@angular/core';
import { PublicService } from '../../services/public.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {
  @Input() userId: number;
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
        if(profile.byteImg != null ) {
          this.user.imageURL = 'data:image/jpeg;base64,' + profile.byteImg;
        }
        this.rating = this.user.rating;
      }
    );
  }
}
