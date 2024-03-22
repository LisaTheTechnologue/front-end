import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripIndexComponent } from './trip-index/trip-index.component';
import { TripCreateComponent } from './trip-create/trip-create.component';
import { TripViewComponent } from './trip-view/trip-view.component';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { TripImageComponent } from './trip-image/trip-image.component';
import { TripParticipantsComponent } from './trip-participants/trip-participants.component';

const routes: Routes = [
  { path: 'trips', redirectTo: 'trips/index', pathMatch: 'full'},
  { path: 'trips/index', component: TripIndexComponent },
  { path: 'trips/:tripId/view', component: TripViewComponent },
  { path: 'trips/create', component: TripCreateComponent },
  { path: 'trips/:tripId/edit', component: TripEditComponent },
  { path: 'trips/:tripId/edit/images', component: TripImageComponent },
  { path: 'trips/:tripId/edit/participants', component: TripParticipantsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule { }
