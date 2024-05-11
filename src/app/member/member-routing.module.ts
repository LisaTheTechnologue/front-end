import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member.component';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { PostTripComponent } from './components/post-trip/post-trip.component';
import { JoinedTripsComponent } from './components/joined-trips/joined-trips.component';
import { MemberProfileComponent } from './components/member-profile/member-profile.component';
import { TripEditComponent } from './components/trip-edit/trip-edit.component';
import { TripPaymentComponent } from './components/trip-payment/trip-payment.component';
import { TripViewComponent } from './components/trip-view/trip-view.component';
import { FeedbackCreateComponent } from './components/feedback-create/feedback-create.component';

const routes: Routes = [
  { path: '', component: MemberComponent },
  { path: 'dashboard', component: MemberComponent },
{ path: 'my-trips', component: MyTripsComponent },
{ path: 'my-trips/view/:tripId', component: TripViewComponent },
{ path: 'my-trips/edit/:tripId', component: TripEditComponent },
{ path: 'my-trips/create', component: PostTripComponent },
{ path: 'joined-trips', component: JoinedTripsComponent },
{ path: 'joined-trips/:tripId', component: TripViewComponent },
{ path: 'join-trip/:tripId', component: TripPaymentComponent },
{ path: 'profile', component: MemberProfileComponent },
{ path: 'feedback/:tripId', component: FeedbackCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
