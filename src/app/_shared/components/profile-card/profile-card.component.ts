import { Component, Input } from '@angular/core';
import { PublicService } from '../../services/public.service';
import { PublicProfile } from '../../models/user.model';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {
  @Input() userId: number;
  user!: PublicProfile;
  rating!:number;
  constructor(
    private publicService: PublicService
  ) {}

  ngOnInit() {
  //   console.log(this.leader);
    this.publicService.getProfile(this.userId).subscribe(
      (profile) => {
        this.user = profile;
        if(profile.byteImg != undefined || profile.byteImg != '') {
          this.user.imageURL = 'data:image/jpeg;base64,' + profile.byteImg;
        }
        this.rating = this.user.rating;
      }
    );
  }
}