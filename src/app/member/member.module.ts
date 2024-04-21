import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { PostTripComponent } from './components/post-trip/post-trip.component';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../MaterialModule';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { JoinedTripsComponent } from './components/joined-trips/joined-trips.component';
import { MemberProfileComponent } from './components/member-profile/member-profile.component';
import { TripEditComponent } from './components/trip-edit/trip-edit.component';
import { CommentViewComponent } from './components/comment-view/comment-view.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { ProfileTripsViewComponent } from './components/profile-trips-view/profile-trips-view.component';

@NgModule({
  declarations: [
    MemberComponent,
    PostTripComponent,
    MyTripsComponent,
    TripDetailsComponent,
    JoinedTripsComponent,
    MemberProfileComponent,
    TripEditComponent,
    CommentViewComponent,
    CommentFormComponent,
    ProfileTripsViewComponent
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule
  ]
})
export class MemberModule { }
