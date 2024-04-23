import { Component, Input } from '@angular/core';
import { Trip } from 'src/app/_shared/models/trip.model';
import { MemberService } from '../../services/member.service';
import { PublicService } from 'src/app/_shared/services/public.service';
import { User } from 'src/app/_shared/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-payment',
  templateUrl: './trip-payment.component.html',
  styleUrls: ['./trip-payment.component.css']
})
export class TripPaymentComponent {

  tripId: number = this.activatedRoute.snapshot.params['tripId'];
  trip!: Trip;
  user: User;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private publicService: PublicService
  ) {}
  ngOnInit(): void {
    this.publicService.getById(this.tripId).subscribe((res) => {
      this.trip = res;
    });
    this.publicService
        .getProfileWithPaymentInfo(this.trip.leaderId)
        .subscribe((user) => (this.user = user));

  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }
  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
  submit() {
    throw new Error('Method not implemented.');
    }
}
