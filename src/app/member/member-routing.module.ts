import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member.component';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { PostTripComponent } from './components/post-trip/post-trip.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { JoinedTripsComponent } from './components/joined-trips/joined-trips.component';
import { MemberProfileComponent } from './components/member-profile/member-profile.component';
import { TripEditComponent } from './components/trip-edit/trip-edit.component';
import { CommentViewComponent } from './components/comment-view/comment-view.component';

const routes: Routes = [
  { path: '', component: MemberComponent },
  { path: 'dashboard', component: MemberComponent },
{ path: 'my-trips', component: MyTripsComponent },
{ path: 'my-trips/view/:tripId', component: TripDetailsComponent },
{ path: 'my-trips/edit/:tripId', component: TripEditComponent },
{ path: 'my-trips/create', component: PostTripComponent },
{ path: 'joined-trips', component: JoinedTripsComponent },
{ path: 'joined-trips/:tripId', component: TripDetailsComponent },
{ path: 'profile', component: MemberProfileComponent },
{ path: 'chat/:tripId', component: CommentViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
