import { Component, Input } from '@angular/core';
import { PublicProfile } from 'src/app/_shared/models/user.model';
import { PublicService } from 'src/app/_shared/services/public.service';

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
        console.log(profile);
        this.user = profile;
        if(profile.byteImg != undefined) {
          this.user.processedImg = 'data:image/jpeg;base64,' + profile.byteImg;
        }
        this.rating = this.user.rating;
      }
    );
  }
}
