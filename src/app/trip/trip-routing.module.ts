import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripIndexComponent } from './trip-index/trip-index.component';
import { TripCreateComponent } from './trip-create/trip-create.component';
import { TripViewComponent } from './trip-view/trip-view.component';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { TripImageComponent } from './trip-image/trip-image.component';
import { TripParticipantsComponent } from './trip-participants/trip-participants.component';
import { TripComponent } from './trip.component';

export const TRIPS_ROUTES: Routes = [
  // { path: 'trips', redirectTo: 'trips/index', pathMatch: 'full'},
  // { path: '', component: TripIndexComponent },
  // { path: ':tripId/view', component: TripViewComponent },
  // { path: 'create', component: TripCreateComponent },
  // { path: ':tripId/edit', component: TripEditComponent },
  // { path: ':tripId/edit/images', component: TripImageComponent },
  // { path: ':tripId/edit/participants', component: TripParticipantsComponent },
//   {
//     path: '',
//     children: [
//       // {
//       //   path: '',
//       //   pathMatch: 'full',
//       //   redirectTo: 'index'
//       // },
//       {
//         path: "",
//         component: TripComponent,
//         children:[
//       { path: 'create', component: TripCreateComponent },
//       { path: ':tripId/view', component: TripViewComponent },
//       { path: 'trips/:tripId/edit', component: TripEditComponent },
//       { path: 'trips/:tripId/edit/images', component: TripImageComponent },
//       { path: 'trips/:tripId/edit/participants', component: TripParticipantsComponent },
// ]
// }]}
];

@NgModule({
  imports: [RouterModule.forChild(TRIPS_ROUTES)],
  exports: [RouterModule],
})
export class TripRoutingModule {}
