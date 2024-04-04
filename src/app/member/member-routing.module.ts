import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member.component';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { PostTripComponent } from './components/post-trip/post-trip.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { PostReportComponent } from './components/post-report/post-report.component';
import { JoinedTripsComponent } from './components/joined-trips/joined-trips.component';

const routes: Routes = [
  { path: '', component: MemberComponent },
{ path: 'my-trips', component: MyTripsComponent },
{ path: 'joined-trips', component: JoinedTripsComponent },
{ path: 'my-trips/:tripId', component: TripDetailsComponent },
{ path: 'trip/report/:tripId', component: PostReportComponent },
{ path: 'create-trip', component: PostTripComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
