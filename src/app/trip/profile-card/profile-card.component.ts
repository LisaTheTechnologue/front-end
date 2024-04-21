import { Component, Input } from '@angular/core';
import { PublicProfile } from 'src/app/_shared/models/user.model';
import { ProfileService } from 'src/app/_shared/services/profile.service';
import { PublicService } from 'src/app/_shared/services/public.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {
  @Input() leaderId: string;
  user!: PublicProfile;
  rating!:number;
  constructor(
    private publicService: PublicService
  ) {}

  ngOnInit() {
    this.publicService.getPublicProfile(this.leaderId ?? '').subscribe(
      (profile) => {
        console.log(profile);
        this.user = profile;
        this.rating = profile.rating;
      }
    );
  }
}
