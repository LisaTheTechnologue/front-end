import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripIndexComponent } from './trip-index/trip-index.component';
import { TripViewComponent } from './trip-view/trip-view.component';

export const TRIPS_ROUTES: Routes = [
  { path: '', component: TripIndexComponent },
  { path: 'view/:tripId', component: TripViewComponent },
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
