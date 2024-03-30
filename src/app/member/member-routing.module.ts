import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member.component';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { PostTripComponent } from './components/post-trip/post-trip.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';

const routes: Routes = [
  { path: '', component: MemberComponent },
{ path: 'my-trips', component: MyTripsComponent },
{ path: 'my-trips/:tripId', component: TripDetailsComponent },
{ path: 'create-trip', component: PostTripComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
