import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
  // { path: 'trips', redirectTo: 'trips/index', pathMatch: 'full'},
  // { path: '', component: TripIndexComponent },
  // { path: ':tripId/view', component: TripViewComponent },
  // { path: 'create', component: TripCreateComponent },
  // { path: ':tripId/edit', component: TripEditComponent },
  // { path: ':tripId/edit/images', component: TripImageComponent },
  // { path: ':tripId/edit/participants', component: TripParticipantsComponent },
]

@NgModule({
  imports: [RouterModule.forChild(USER_ROUTES)],
  exports: [RouterModule],
})
export class BoardUserRoutingModule {}
